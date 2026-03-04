# TODO: Fix Email Sending Issue

## Problem
- Contact form saves to SQLite but doesn't send actual emails
- nodemailer is installed but not implemented in server.js

## Solution
1. Create server/.env file with Gmail SMTP configuration
2. Update server/server.js to implement nodemailer for sending emails

## Steps
- [ ] Create server/.env file with email configuration
- [ ] Update server/server.js to add nodemailer email sending logic
- [ ] Test the contact form

## Notes
- Using Gmail SMTP
- Email: pratham.panchal0626@gmail.com (from Contact.js)
- Need app-specific password for Gmail
