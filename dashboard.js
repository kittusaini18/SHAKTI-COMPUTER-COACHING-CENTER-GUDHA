// Set user email on page load
document.addEventListener('DOMContentLoaded', () => {
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');
    
    if (!userEmail || userRole !== 'teacher') {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return;
    }
    
    // Display user email
    const userEmailElement = document.getElementById('userEmail');
    if (userEmailElement) {
        userEmailElement.textContent = `Logged in as: ${userEmail}`;
    }
    
    // Load and display data
    loadNotifications();
    loadEnrollments();
});

function logout() {
    // Clear session
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    
    // Redirect to login
    window.location.href = 'login.html';
}

function loadNotifications() {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const notificationsList = document.getElementById('notificationsList');
    
    if (!notificationsList) return;
    
    if (notifications.length === 0) {
        notificationsList.innerHTML = '<p>No activities yet</p>';
        return;
    }
    
    let html = '<ul style="list-style: none;">';
    notifications.forEach(notif => {
        const date = new Date(notif.timestamp).toLocaleString();
        html += `
            <li style="padding: 10px; margin-bottom: 8px; background-color: #f9f9f9; border-left: 3px solid #667eea; border-radius: 3px;">
                <strong>${notif.type}:</strong> ${notif.message}<br>
                <small style="color: #999;">${date}</small>
            </li>
        `;
    });
    html += '</ul>';
    notificationsList.innerHTML = html;
}

function loadEnrollments() {
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const studentsList = document.getElementById('studentsList');
    
    if (!studentsList) return;
    
    if (enrollments.length === 0) {
        studentsList.innerHTML = '<p>No enrollment requests yet</p>';
        return;
    }
    
    let html = '<ul style="list-style: none;">';
    enrollments.forEach(enrollment => {
        const date = new Date(enrollment.timestamp).toLocaleString();
        html += `
            <li style="padding: 10px; margin-bottom: 8px; background-color: #f9f9f9; border-left: 3px solid #667eea; border-radius: 3px;">
                <strong>${enrollment.fullName}</strong><br>
                Email: ${enrollment.email}<br>
                Phone: ${enrollment.phone}<br>
                Course: ${enrollment.course}<br>
                <small style="color: #999;">${date}</small>
            </li>
        `;
    });
    html += '</ul>';
    studentsList.innerHTML = html;
}

function viewEnrollments() {
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    
    if (enrollments.length === 0) {
        alert('No enrollment requests yet');
        return;
    }
    
    let message = 'Enrollment Requests:\n\n';
    enrollments.forEach((enrollment, index) => {
        const date = new Date(enrollment.timestamp).toLocaleString();
        message += `${index + 1}. ${enrollment.fullName}\n`;
        message += `   Email: ${enrollment.email}\n`;
        message += `   Phone: ${enrollment.phone}\n`;
        message += `   Course: ${enrollment.course}\n`;
        message += `   Batch: ${enrollment.batch}\n`;
        message += `   Date: ${date}\n\n`;
    });
    
    alert(message);
}

function viewNotifications() {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    
    if (notifications.length === 0) {
        alert('No activities to display');
        return;
    }
    
    let message = 'Activity Log:\n\n';
    notifications.forEach((notif, index) => {
        const date = new Date(notif.timestamp).toLocaleString();
        message += `${index + 1}. [${notif.type}] ${notif.message}\n   ${date}\n\n`;
    });
    
    alert(message);
}

function exportData() {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    
    const data = {
        exportDate: new Date().toISOString(),
        exportedBy: localStorage.getItem('userEmail'),
        notifications: notifications,
        enrollments: enrollments,
        teacherEmails: [
            'kittukapoor671@gmail.com',
            'aysuhkapoor900@gmail.com'
        ],
        phone: '8571913652'
    };
    
    // Convert to JSON and download
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shakti-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    alert('Data exported successfully!');
}