const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('connected to MongoDB');
    
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;