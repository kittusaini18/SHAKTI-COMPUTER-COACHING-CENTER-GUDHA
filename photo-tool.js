let photoInput = document.getElementById('photoInput');
let image = document.getElementById('image');
let cropper;
let currentCanvas;

// Passport photo dimensions (standard 35x45mm)
const passportDimensions = {
    width: 354,
    height: 413,
    dpi: 300
};

const photoConfigs = {
    '6': { cols: 2, rows: 3 },
    '12': { cols: 3, rows: 4 },
    '18': { cols: 3, rows: 6 },
    '24': { cols: 6, rows: 4 }
};

// Handle photo input
photoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            image.src = event.target.result;
            document.getElementById('photoEditor').style.display = 'block';
            document.getElementById('previewSection').style.display = 'none';
            
            // Initialize cropper
            if (cropper) {
                cropper.destroy();
            }
            
            cropper = new Cropper(image, {
                aspectRatio: 354 / 413,
                viewMode: 1,
                autoCropArea: 1,
                responsive: true,
                guides: true,
                center: true,
                highlight: true,
                cropBoxMovable: true,
                cropBoxResizable: true,
                toggleDragModeOnDblclick: true,
            });
        };
    }
});

// Update brightness, contrast, saturation
document.getElementById('brightness').addEventListener('input', function() {
    document.getElementById('brightnessValue').textContent = this.value + '%';
    applyFilters();
});

document.getElementById('contrast').addEventListener('input', function() {
    document.getElementById('contrastValue').textContent = this.value + '%';
    applyFilters();
});

document.getElementById('saturation').addEventListener('input', function() {
    document.getElementById('saturationValue').textContent = this.value + '%';
    applyFilters();
});

document.getElementById('blur').addEventListener('input', function() {
    document.getElementById('blurValue').textContent = this.value + 'px';
    applyFilters();
});

// Color picker for background
document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.color-btn').forEach(b => b.style.border = 'none');
        this.style.border = '3px solid #333';
    });
});

// Apply filters
function applyFilters() {
    const brightness = document.getElementById('brightness').value;
    const contrast = document.getElementById('contrast').value;
    const saturation = document.getElementById('saturation').value;
    const blur = document.getElementById('blur').value;
    
    const filters = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`;
    image.style.filter = filters;
}

// Remove background (using CSS filter effect)
document.getElementById('removeBackground').addEventListener('click', function() {
    const saturation = document.getElementById('saturation');
    saturation.value = 200;
    document.getElementById('saturationValue').textContent = '200%';
    applyFilters();
    alert('Background lightening applied! You can further adjust with other filters.');
});

// Reset filters
function resetFilters() {
    document.getElementById('brightness').value = 100;
    document.getElementById('contrast').value = 100;
    document.getElementById('saturation').value = 100;
    document.getElementById('blur').value = 0;
    document.getElementById('brightnessValue').textContent = '100%';
    document.getElementById('contrastValue').textContent = '100%';
    document.getElementById('saturationValue').textContent = '100%';
    document.getElementById('blurValue').textContent = '0px';
    image.style.filter = 'none';
}

// Cancel editor
function cancelEditor() {
    if (cropper) {
        cropper.destroy();
    }
    document.getElementById('photoEditor').style.display = 'none';
    document.getElementById('photoInput').value = '';
    photoInput.click();
}

// Update photo size
function updatePhotoSize() {
    console.log('Photo size updated');
}

// Generate passport photos
function generatePassportPhotos() {
    const canvas = cropper.getCroppedCanvas({
        maxWidth: passportDimensions.width,
        maxHeight: passportDimensions.height,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
    });

    // Apply filters to canvas
    const ctx = canvas.getContext('2d');
    const brightness = document.getElementById('brightness').value;
    const contrast = document.getElementById('contrast').value;
    const saturation = document.getElementById('saturation').value;
    const blur = document.getElementById('blur').value;
    
    const filters = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`;
    ctx.filter = filters;

    const photoSize = document.getElementById('photoSize').value;
    const config = photoConfigs[photoSize];
    const selectedColor = document.querySelector('.color-btn[style*="border"]')?.dataset.color || 'white';

    // Create composite canvas with multiple photos
    const compositeCanvas = document.createElement('canvas');
    const compositeWidth = (passportDimensions.width + 20) * config.cols;
    const compositeHeight = (passportDimensions.height + 20) * config.rows;
    
    compositeCanvas.width = compositeWidth;
    compositeCanvas.height = compositeHeight;
    const compositeCtx = compositeCanvas.getContext('2d');

    // Set background color
    compositeCtx.fillStyle = selectedColor;
    compositeCtx.fillRect(0, 0, compositeWidth, compositeHeight);

    // Draw photos grid
    let photoCount = 0;
    for (let row = 0; row < config.rows; row++) {
        for (let col = 0; col < config.cols; col++) {
            const x = col * (passportDimensions.width + 20) + 10;
            const y = row * (passportDimensions.height + 20) + 10;
            
            compositeCtx.filter = filters;
            compositeCtx.drawImage(canvas, x, y, passportDimensions.width, passportDimensions.height);
            photoCount++;
        }
    }

    currentCanvas = compositeCanvas;
    
    // Show preview
    const previewContainer = document.getElementById('previewContainer');
    previewContainer.innerHTML = '';
    
    const img = document.createElement('img');
    img.src = compositeCanvas.toDataURL();
    img.style.maxWidth = '100%';
    img.style.border = '2px solid #ddd';
    img.style.borderRadius = '8px';
    
    previewContainer.appendChild(img);
    
    document.getElementById('photoEditor').style.display = 'none';
    document.getElementById('previewSection').style.display = 'block';
    
    // Add info
    const info = document.createElement('p');
    info.innerHTML = `<strong>Total Photos: ${photoCount} | Size: ${photoSize} Photos | Background: ${selectedColor}</strong>`;
    info.style.marginTop = '20px';
    info.style.textAlign = 'center';
    previewContainer.appendChild(info);
}

// Back to editor
function backToEditor() {
    document.getElementById('previewSection').style.display = 'none';
    document.getElementById('photoEditor').style.display = 'block';
}

// Download photos
function downloadPhotos() {
    if (currentCanvas) {
        const link = document.createElement('a');
        link.href = currentCanvas.toDataURL('image/png');
        link.download = `passport-photos-${new Date().getTime()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
