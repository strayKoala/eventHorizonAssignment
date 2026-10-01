const User = require("../models/models")
const errorHandler = require('../middleware/errorHandler');

const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(
            req.user.userId
        ).select('-password -verificationTokenHash -verificationTokenExpiresAt');
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json({
            user
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getProfile;