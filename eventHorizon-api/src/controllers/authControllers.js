require('dotenv').config();
const bcrypt = require('bcryptjs');
const { registrationValidation, loginValidation } = require('../utils/validation');
const User = require('../models/models');
const { createVerificationToken, hashToken, createAccessToken } = require('../utils/token');
const sendVerificationEmail = require('../utils/email');
const errorHandler = require('../middleware/errorHandler');


const register = async (req, res, next) => {
    try {
        console.log('req.body:', req.body);
        const { error, value } = registrationValidation.validate(
            req.body, {
            abortEarly: false,
            stripUnknown: true
        }
        );
        if (error) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: error.details.map(
                    detail => detail.message
                )
            });
        }
        const { firstName, lastName, email, password } = value;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: 'Email is already registered'
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            12
        );

        const verificationToken = createVerificationToken();
        const verificationTokenHash = hashToken(verificationToken);

        const verificationTokenExpiresAt = new Date(
            Date.now() +
            Number(process.env.VERIFICATION_TOKEN_EXPIRES_IN_MINUTES) * 60 * 1000
        );

        const user = await User.create({
            firstName, lastName, email, password: hashedPassword,
            isVerified: false, verificationTokenHash,
            verificationTokenExpiresAt
        });

        const verificationLink = `${process.env.BACKEND_URL}/api/auth/verify-email?token=${verificationToken}`;
        try {
            await sendVerificationEmail(
                user.email,

                'Verify your EventHorizon account',

                `Welcome to EventHorizon
                
                Thank you for creating an account with us ${user.firstName} ${user.lastName}.
                
                Please click the link below to verify your email address:
                
                ${verificationLink}
                
                This verification link will expire in ${process.env.VERIFICATION_TOKEN_EXPIRES_IN_MINUTES} minutes`,

                verificationToken
            );
        } catch (emailError) {
            console.log(emailError);
            await User.findByIdAndDelete(user._id);
            return res.status(500).json({
                message: 'Account could not be created because verification email could not be sent'
            });
        }
        return res.status(201).json({
            message: 'Reistration successful. Please check your email for a link to verify your account'
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { error, value } = loginValidation.validate(
            req.body,
            {
                abortEarly: false,
                stripUnknown: true
            }
        );

        const { email, password } = value;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email'
            });
        }
        if (!user.isVerified) {
            return res.status(403).json({
                message: 'Please verify your email before logging in'
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        );
        if (!passwordMatches) {
            return res.status(401).json({
                message: 'Invalid password'
            });
        }

        const token = createAccessToken(user);
        return res.status(200).json({
            message: 'login successful',
            token,

            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isVerified: user.isVerified
            }
        });
    } catch (error) {
        next(error);
    }
}



const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({
                message: 'Verification token is required'
            });
        }
        const tokenHash = hashToken(token);
        const user = await User.findOne({ verificationTokenHash: tokenHash });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid verification token'
            });
        }

        if (
            user.verificationTokenExpiresAt < Date.now()
        ) {
            return res.status(400).json({
                message: 'Expired verification token'
            });
        }
        user.isVerified = true;
        
        user.verificationTokenHash = null;

        user.verificationTokenExpiresAt = null;

        await user.save();

        return res.status(200).json({
            message: 'Email verified successfully. You can now log in.'
        });
    } catch (error) {
        next(error)
    }
}


module.exports = { verifyEmail, login, register };