const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user.model");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.send("User Added successfully!!");
    }
    catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});

// Get user by emailId
app.get("/user", async (req, res) => {
    const userEmailId = req.body.emailId;

    try {
        const user = await User.findOne({ emailId: userEmailId });
        if (!user) {
            res.status(404).send("User not Found!!");
        }
        else {
            res.send(user);
        }
    }
    catch (err) {
        res.status(400).send("Something went Wrong!!");
    }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    }
    catch (err) {
        res.status(400).send("Something went Wrong!!");
    }
});

// Delete a user from the database
app.delete("/user", async (req, res) => {
    const userId = req.body._id;
    console.log(userId);

    try {
        await User.findByIdAndDelete(userId);
        res.send("User Deleted successfully!!");
    }
    catch (err) {
        res.status(400).send("Something went Wrong!!");
    }
});

// Update data of the user
app.patch("/user", async (req, res) => {
    const dataToUpdate = req.body;

    try {
        await User.findByIdAndUpdate(dataToUpdate._id, dataToUpdate);
        res.send("User updated Successfully!!");
    }
    catch (err) {
        res.status(400).send("Something went Wrong!!");
    }
});

// Update the user with emailId
app.patch("/user/update", async (req, res) => {
    try {
        await User.findOneAndUpdate({ emailId: req.body.emailId }, { firstName: "DEF", lastName: "GHI" });
        res.send("User updated Successfully!!");
    }
    catch (err) {
        res.status(400).send("Something went Wrong!!");
    }
});

connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(7777, () => {
            console.log("Server is successfully listening on port 7777...");
        });
    })
    .catch(err => {
        console.log("Database cannot be connected!!");
        console.log("Error: " + err.message)
    });