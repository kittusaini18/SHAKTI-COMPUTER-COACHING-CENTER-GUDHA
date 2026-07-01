const TEACHER_EMAILS = [
    'kittukapoor671@gmail.com',
    'aysuhkapoor900@gmail.com'
];

const CONTACT_INFO = {
    phone: '8571913652',
    emails: TEACHER_EMAILS
};

function handleEnrollment(event) {
    event.preventDefault();
    
    const enrollmentData = {
        timestamp: new Date().toISOString(),
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        dob: document.getElementById('dob').value,
        course: document.getElementById('course').value,
        batch: document.getElementById('batch').value,
        experience: document.getElementById('experience').value,
        message: document.getElementById('message').value
    };
    
    // Store enrollment
    let enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    enrollments.push(enrollmentData);
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
    
    // Send notification to all teachers
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.push({
        timestamp: new Date().toISOString(),
        type: 'NEW_ENROLLMENT',
        from: enrollmentData.email,
        message: `New enrollment request from ${enrollmentData.fullName} for ${enrollmentData.course}`,
        recipients: TEACHER_EMAILS
    });
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    // Show success message
    const messageDiv = document.getElementById('message');
    messageDiv.classList.add('success');
    messageDiv.textContent = `Thank you ${enrollmentData.fullName}! Your enrollment request has been submitted. We will contact you soon at ${enrollmentData.phone}. Contact: ${TEACHER_EMAILS.join(', ')} | Phone: 8571913652`;
    
    // Reset form
    document.getElementById('enrollmentForm').reset();
    
    console.log('Enrollment submitted:', enrollmentData);
    console.log('Notification sent to teachers:', TEACHER_EMAILS);
}

document.addEventListener('DOMContentLoaded', () => {
    // Enrollment form is accessible to everyone
});