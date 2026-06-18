// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#' && !this.id.includes('teacherLoginBtn')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Student Enrollment Form
document.getElementById('enrollmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('studentName').value;
    const email = document.getElementById('studentEmail').value;
    const phone = document.getElementById('studentPhone').value;
    const course = document.getElementById('courseSelect').value;
    const message = document.getElementById('studentMessage').value;
    
    // Store enrollment data in localStorage
    let enrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
    enrollments.push({
        name: name,
        email: email,
        phone: phone,
        course: course,
        message: message,
        date: new Date().toLocaleDateString('en-IN')
    });
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
    
    // Show success message
    document.getElementById('enrollmentForm').style.display = 'none';
    document.getElementById('enrollmentMessage').style.display = 'block';
    
    // Reset after 3 seconds
    setTimeout(() => {
        document.getElementById('enrollmentForm').style.display = 'block';
        document.getElementById('enrollmentMessage').style.display = 'none';
        document.getElementById('enrollmentForm').reset();
    }, 3000);
});

// Teacher Login Modal
const teacherModal = document.getElementById('teacherModal');
const dashboardModal = document.getElementById('dashboardModal');
const teacherLoginBtn = document.getElementById('teacherLoginBtn');
const closeBtn = document.querySelector('.close');
const teacherForm = document.getElementById('teacherForm');
const logoutBtn = document.getElementById('logoutBtn');

// Demo credentials
const DEMO_EMAIL = 'teacher@shakti.com';
const DEMO_PASSWORD = 'password123';

// Open Teacher Login Modal
teacherLoginBtn.addEventListener('click', () => {
    teacherModal.style.display = 'flex';
});

// Close Modal
closeBtn.addEventListener('click', () => {
    teacherModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === teacherModal) {
        teacherModal.style.display = 'none';
    }
    if (e.target === dashboardModal) {
        dashboardModal.style.display = 'none';
    }
});

// Teacher Login Form
teacherForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('teacherEmail').value;
    const password = document.getElementById('teacherPassword').value;
    
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        localStorage.setItem('teacherLoggedIn', 'true');
        teacherModal.style.display = 'none';
        showDashboard();
    } else {
        alert('Invalid credentials. Demo: teacher@shakti.com / password123');
    }
});

// Show Dashboard
function showDashboard() {
    dashboardModal.style.display = 'flex';
    loadDashboardData();
}

// Load Dashboard Data
function loadDashboardData() {
    const enrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
    
    // Update enrollments table
    const enrollmentsTable = document.getElementById('enrollmentsTable');
    enrollmentsTable.innerHTML = '';
    
    enrollments.forEach(enrollment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${enrollment.name}</td>
            <td>${enrollment.email}</td>
            <td>${enrollment.phone}</td>
            <td>${enrollment.course}</td>
            <td>${enrollment.date}</td>
            <td><span class="status-badge active">New</span></td>
        `;
        enrollmentsTable.appendChild(row);
    });
    
    // Update analytics
    document.getElementById('totalStudents').textContent = new Set(enrollments.map(e => e.email)).size;
    document.getElementById('totalEnrollments').textContent = enrollments.length;
    
    // Count this month
    const today = new Date();
    const currentMonth = today.toLocaleDateString('en-IN', { month: '2-digit', year: 'numeric' });
    const thisMonth = enrollments.filter(e => e.date.includes(currentMonth)).length;
    document.getElementById('thisMonth').textContent = thisMonth;
    
    // Calculate revenue (only Advanced Excel course has ₹2500)
    const revenue = enrollments.filter(e => e.course.includes('Advanced Excel')).length * 2500;
    document.getElementById('revenue').textContent = '₹' + revenue.toLocaleString('en-IN');
}

// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Show selected tab
        document.getElementById(tabName).classList.add('active');
    });
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('teacherLoggedIn');
    dashboardModal.style.display = 'none';
});

// Check if teacher is already logged in
window.addEventListener('load', () => {
    if (localStorage.getItem('teacherLoggedIn') === 'true') {
        showDashboard();
    }
});

// Add scroll animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.course-card, .coming-card, .about-text').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Highlight active section on scroll
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active link styling
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        border-bottom: 3px solid #ff6b6b;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);
