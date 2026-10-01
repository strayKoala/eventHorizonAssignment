const errorHandler = (err, req, res, next) => {
    console.log(err);

    if (err.code === 11000) {
        return res.status(409).json({
            message: 'A record with that value already exists'
        })
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Database Validation Failed',
            errors: Object.values(err.errors).map(error => error.message)
        });
    }

    return res.status(500).json({
        message: 'Internal server error'
    });
};

module.exports = errorHandler;