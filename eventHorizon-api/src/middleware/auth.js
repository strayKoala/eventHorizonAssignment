require('dotenv').config();
const jwt = require('jsonwebtoken');


const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log('Authorization Header:', authHeader); 
        if (!authHeader) {
            return res.status(401).json({
                message: 'Authorization token is required'
            });
        }
        const parts = authHeader.split(/\s+/);
        if (
            parts.length !== 2 ||
            parts[0] !== 'Bearer'
        ) {
            return res.status(401).json({
                message: 'Authorization format must be Bearer <token>'
            });
        }

        const token = parts[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired authentication token'
        });
    }
}


module.exports = protect;

