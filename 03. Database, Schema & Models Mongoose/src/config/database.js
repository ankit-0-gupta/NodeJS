const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://username:password@url.mongodb.net/temp");
};

module.exports = connectDB;
