# SHAKTI Computer & Coaching Center - Teacher Portal

Welcome to the SHAKTI Computer & Coaching Center web portal. This system provides teacher management with enrollment tracking and notifications.

## ✨ Features

### 🔐 Authentication System
- **Teacher Portal**: Restricted login for authorized teachers only
- Session management with localStorage
- Two authorized teacher accounts

### 👨‍🏫 Teacher Features
- Access to teacher dashboard after login
- View all student enrollment requests
- View activity log with notifications
- Track login events from both teachers
- Contact information management
- Export enrollment and activity data

### 📋 Student Enrollment
- Public enrollment form accessible from landing page
- Student data collection form
- Course selection
- Batch timing selection
- Automatic notifications to both teachers upon enrollment

### 📧 Notification System
- Automatic login notifications to all teachers
- Enrollment request notifications with student details
- Real-time activity log tracking
- Ready for email service integration

## 🔑 Authorized Teachers

Both teachers have full access to the system:

| Email | Password |
|-------|----------|
| kittukapoor671@gmail.com | Kittu@123 |
| aysuhkapoor900@gmail.com | Ayush@123 |

## ☎️ Contact Information

- **Teacher 1 Email**: kittukapoor671@gmail.com
- **Teacher 2 Email**: aysuhkapoor900@gmail.com
- **Phone**: 8571913652

## 📁 File Structure

```
.
├── index.html                 # Main landing page
├── login.html                 # Teacher login page
├── login.js                   # Login authentication logic
├── login.css                  # Login page styling
├── teacher-dashboard.html     # Teacher dashboard
├── dashboard.js               # Dashboard logic
├── dashboard.css              # Dashboard styling
├── enrollment.html            # Student enrollment form
├── enrollment.js              # Enrollment form logic
├── enrollment.css             # Enrollment form styling
└── README.md                  # This file
```

## 🚀 Getting Started

### For Teachers:
1. Open `login.html` in your web browser
2. Use one of the teacher credentials to login
3. Access the teacher dashboard to view enrollments and activity

### For Students:
1. Open `enrollment.html` to access the enrollment form
2. Fill in all required information
3. Submit the form
4. Both teachers will receive notification of the new enrollment

## 📝 Enrollment Process

Students can enroll through the enrollment form by providing:
- Full name
- Email address
- Phone number
- Date of birth
- Course preference
- Batch timing preference
- Computer experience level
- Additional comments

Upon submission:
- Data is stored securely
- Both teachers receive notification: kittukapoor671@gmail.com & aysuhkapoor900@gmail.com
- Students can be contacted at: 8571913652

## 📊 Courses Available

- Basic Computer Skills
- Web Design & Development
- Programming (Java, Python)
- Digital Marketing
- Competitive Exam Preparation

## 📅 Batch Timings

- Morning: 9 AM - 12 PM
- Afternoon: 2 PM - 5 PM
- Evening: 6 PM - 9 PM

## 📧 Email Notifications

The system tracks and logs:
- Login events from both teachers
- New enrollment requests with full student details
- All activities with timestamps

### Future Enhancement
To send actual emails, integrate with:
- Firebase Email Service
- SendGrid API
- AWS SES
- Node.js backend with nodemailer
- Gmail API

## 💾 Data Storage

Currently uses browser localStorage for demo purposes. Data includes:
- Teacher login records
- Student enrollments
- Activity notifications
- Teacher sessions

### For Production:
- Replace localStorage with proper database (MongoDB, Firebase, etc.)
- Implement backend API for data persistence
- Add real email service integration
- Implement proper security (JWT, OAuth, HTTPS)
- Add password hashing and secure authentication

## ⚙️ Configuration

The system is pre-configured with:
- Two teacher accounts
- Phone contact: 8571913652
- Two teacher email addresses

No additional configuration needed to get started!

## 🔒 Security Features

- Password-protected teacher login
- Session validation on dashboard access
- Automatic logout option
- Only authorized teachers can access dashboard

### Security Best Practices for Production:
- Use HTTPS for all communications
- Hash passwords (bcrypt, argon2)
- Implement JWT token-based authentication
- Add rate limiting for login attempts
- Database-backed session management
- Regular security audits

## 📱 Responsive Design

- Mobile-friendly interface
- Tablet optimized
- Desktop ready
- Responsive grid layout
- Touch-friendly buttons

## 🛠️ Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📞 Support

For issues or questions:
- **Teacher 1**: kittukapoor671@gmail.com
- **Teacher 2**: aysuhkapoor900@gmail.com
- **Phone**: 8571913652

---

**SHAKTI Computer & Coaching Center** - Empowering Education Through Technology

Version: 1.0
