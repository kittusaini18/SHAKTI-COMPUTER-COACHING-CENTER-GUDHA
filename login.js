// Authorized teachers only
const AUTHORIZED_TEACHERS = [
    {
        email: 'kittukapoor671@gmail.com',
        password: 'Kittu@123'
    },
    {
        email: 'aysuhkapoor900@gmail.com',
        password: 'Ayush@123'
    }
];

const TEACHER_EMAILS = [
    'kittukapoor671@gmail.com',
    'aysuhkapoor900@gmail.com'
];

const CONTACT_INFO = {
    phone: '8571913652',
    emails: TEACHER_EMAILS
};

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
    
    // Remove previous messages
    messageDiv.classList.remove('success', 'error');
    messageDiv.textContent = '';
    
    // Validate teacher login
    const teacher = AUTHORIZED_TEACHERS.find(t => t.email === email && t.password === password);
    
    if (teacher) {
        messageDiv.classList.add('success');
        messageDiv.textContent = 'Welcome, Teacher! Logging in...';
        
        // Store session
        localStorage.setItem('userRole', 'teacher');
        localStorage.setItem('userEmail', email);
        
        // Send notification email to all teachers
        sendNotification(email, 'TEACHER_LOGIN', `Teacher ${email} logged in successfully`);
        
        // Redirect to teacher dashboard
        setTimeout(() => {
            window.location.href = 'teacher-dashboard.html';
        }, 1500);
        
    } else {
        messageDiv.classList.add('error');
        messageDiv.textContent = 'Invalid email or password. Only authorized teachers can login.';
    }
}

function sendNotification(email, type, message) {
    // Create notification that will be sent to all teachers
    const notification = {
        timestamp: new Date().toISOString(),
        type: type,
        from: email,
        message: message,
        recipients: TEACHER_EMAILS
    };
    
    // Log notification
    console.log('Notification:', notification);
    
    // Store in localStorage for demo purposes
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.push(notification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

// Handle page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'teacher') {
        window.location.href = 'teacher-dashboard.html';
    }
});