const mongoose = require('mongoose')
require("dotenv").config();

const DB_URI = process.env.MONGO_URI;
const MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI, MONGO_OPTIONS);
        console.log('mongo connected')
    }catch (e) {
        console.log('Mongo not connected', e);
        process.exit();
    }
};

module.exports = connectDB;