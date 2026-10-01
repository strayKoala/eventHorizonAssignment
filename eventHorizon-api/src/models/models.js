const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    verificationTokenHash: {
        type: String,
        default: null
    },

    verificationTokenExpiresAt: {
        type: Date,
        default: null
    }
}, {timestamps: true}
);

const User = mongoose.model('User', userSchema);

module.exports = User;