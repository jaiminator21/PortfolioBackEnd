const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateSign = (id, email) => { //token generator
  return jwt.sign({ id, email }, process.env.JWT_KEY, {
    expiresIn: "24h", //token duratio. It will expire in 24h since its generation
  }); 
};
const verifySign = (token) => {
  return jwt.verify(
    token,
    process.env.JWT_KEY
  );
 //verification that checks if the token is valid
};

module.exports = { generateSign, verifySign };
