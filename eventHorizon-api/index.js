require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');


const app = express();
const port = process.env.PORT

app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.status(200).json({
        messsage: 'Welcome to EventHorizon'
    })
})

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use(errorHandler);


connectDB();


app.listen(port, () => {
    console.log(`EventHorizon is running on port ${port}`);
});
