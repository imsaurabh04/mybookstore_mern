const mongoose = require("mongoose");
require('dotenv').config();

const connectDb = async() => {
    
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database...");
    } catch(err) {
        console.log(err.message);
    }
}

module.exports = connectDb;