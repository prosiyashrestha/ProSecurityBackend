const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//connecting datbase
const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://prosiyashrestha:usDWa2yrHcDL1Y9R@security.otg3v.mongodb.net/"
    )
    .then(async () => {
      //create admin if it does not exist
      console.log("Database connected!");
      const adminEmail = "admin@example.com"; // Set the admin email
      const existingAdmin = await User.findOne({ email: adminEmail });
      console.log("existing adming", existingAdmin);
      if (
        !existingAdmin ||
        existingAdmin == undefined ||
        existingAdmin == null
      ) {
        // Create a new admin user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("admin", salt); // Replace with a secure password
        const adminUser = new User({
          fname: "Admin",
          lname: "User",
          phone: "1234567890", // Replace with the admin phone number
          email: adminEmail,
          password: hashedPassword,  //admin
          role: "admin",
        });

        adminUser.save();
        console.log("Admin user created");
      } else {
        console.log("Admin user already exists");
      }
    });
};

//Exporting the function

module.exports = connectDatabase;
