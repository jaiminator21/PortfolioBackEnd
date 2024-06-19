const mongoose = require("mongoose");
// Load environment variables from the .env file
require("dotenv").config();

// Get variable URL from .env file
const DB_URL = process.env.DB_URL;

const connect = async () => {
  try {
    // DB connection
    const db = await mongoose.connect(DB_URL);

    // Gets the name and host form DB
    const { name, host } = db.connection;
    // If connection is successful
    console.log(`Connected to the database ${name} DB at host ${host}`);
  } catch (error) {
    // If connection is unsuccessful
    console.log("Error connecting to our database", error);
  }
};

// Funtion export
module.exports = { connect };
