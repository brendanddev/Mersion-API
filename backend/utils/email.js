
// email.js
//
// Brendan Dileo, June 2025


const { createTransport } = require('nodemailer');

// Creates the url that will be used to send email
const createPasswordResetUrl = (id, token) => {
    `${process.env.CLIENT_URL}/reset-password/${id}/${token}`;
}

// Creates the transporter to send emails
const transporter = createTransport({
    service: process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});