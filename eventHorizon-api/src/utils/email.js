require('dotenv').config();
const nodemailer = require('nodemailer');
const Resend = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);


const sendVerificationEmail = async (email, subject, text, token) => {


    await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: subject,
        text: text
    })
}

module.exports = sendVerificationEmail;

