const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://temporary:temporaryPassword@cluster0.ztk6a.mongodb.net/temp");
};

module.exports = connectDB;