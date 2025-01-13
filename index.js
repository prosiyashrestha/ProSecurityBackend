// importing the pacakages(express)
const express = require("express");
const mongoose = require("mongoose");

const connectDatabase = require("./database/database");
const dotenv = require("dotenv");

const cors = require("cors");
const acceptFormData = require("express-fileupload");

// Creating an express application
const app = express();

//Configure cors policy
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Express JSON config
app.use(express.json());

//Config form data
app.use(acceptFormData());

//Make a static public folder
app.use(express.static("./public"));

// Connecting  to Database then create admin user if does not exist
connectDatabase();

// dotenv configuration
dotenv.config();

//Defining the port
const PORT = process.env.PORT;

//Making a test endpoint
// Endpoint : POST, GET, PUT, DELETE
app.get("/test", (req, res) => {
  res.send("Test api is working..");
});

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/categorys", require("./routes/categoryRoutes"));
app.use("/api/venues", require("./routes/venueRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/rating-comment", require("./routes/ratingCommentRoute"));
// Configuring Routes of User

// http://localhost5500/api/user/create

//Starting the server
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT} !`);
});
