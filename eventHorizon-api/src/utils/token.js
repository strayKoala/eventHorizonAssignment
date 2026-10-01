const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const createAccessToken = (user) => {
    return jwt.sign(
        {
            userId: user._id.toString()
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
};

const createVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};


module.exports = { createAccessToken, createVerificationToken, hashToken };