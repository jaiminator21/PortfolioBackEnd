const User = require("../models/users.model");
const { generateSign } = require("../../utils/jwt");
const { validateEmail, validatePassword, usedEmail } = require("../../utils/validators");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const newUser = new User(req.body);
    if (!validateEmail(newUser.email)) { //using validators to check if the email is valid
      return res.status(400).json({
        message:
          "Please enter a valid email.",
      }); 
    }
    if (!validatePassword(newUser.password)) {//using validators to check if the password is valid
      return res.status(400).json({
        message:
          "The password does not meet the required parameters: 1 lowercase, 1 uppercase, 1 number, and 1 special character. ",
      });     
    }
    if (await usedEmail(newUser.email)) {//checks if the email being registered exists
      return res.status(400).json({
        message: "This email is already in use.",
      });
    }

    const salt = 10; //lvl of encryption
    newUser.password = bcrypt.hashSync( //function to encrypt the password
      newUser.password,salt
    );
    const createdUser = await newUser.save();
    return res.status(201).json(createdUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const userInfo = await User.findOne({ email: req.body.email }); //after the isAuth, it searches for the email that it recived 
    if (!userInfo) {//if there is no user
      return res.status(404).json({ message: "This user doesn't exist" });
    }
    if (!bcrypt.compareSync(req.body.password, userInfo.password)) { // after decypting the passwords it checks if they are the same
      return res.status(404).json({ message: "The passwords isn't correct" });
    }
    const token = generateSign(userInfo._id, userInfo.email); //generates token
    return res.status(200).json({ user: userInfo, token: token });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const logout = (req, res, next) => {
  try {
    const token = null; // deletes token
    return res.status(200).json({
      status: 200,
      message: "Logout successful",
    });
  } catch (error) {
    return next(setError(error.statusCode, "Logout Error"));
  }
};

const checkSession = (req, res) => {
  try {
    return res.status(201).json(req.user);
  } catch (error) {
    return res.tatus(500).json(error);
  }
};

module.exports = { register, login, logout, checkSession };
