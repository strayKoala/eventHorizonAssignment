require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});


const sendVerificationEmail = async (email, subject, text, token) => {


    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: subject,
        text: text
    })
}

module.exports = sendVerificationEmail;

