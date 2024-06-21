const express = require("express");
const userRoutes = express.Router();
const {
  register,
  login,
  logout,
  checkSession,
} = require("../controllers/users.controllers");
const {
  isAuth,
} = require("../../middlewares/auth"); 

userRoutes.post("/register", register); 
userRoutes.post("/login", login); 
userRoutes.post("/logout", [isAuth], logout);
userRoutes.get("/checksession", [isAuth], checkSession);

module.exports = userRoutes;
