const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Serverless-friendly MongoDB connection
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((mongoose) => mongoose);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

// Middleware to ensure DB connection for every request
app.use(async (req, res, next) => {
    await connectToDatabase();
    next();
});


// Friendly root route
app.get('/', (req, res) => {
    res.send('Clinic API is running!');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/doctors', require('./routes/doctor'));
app.use('/api/appointments', require('./routes/appointment'));
app.use('/api/queue', require('./routes/queue'));

// Export the app for Vercel serverless function
module.exports = app;