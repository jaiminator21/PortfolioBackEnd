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
} = require("../../middlewares/auth"); /* importamos la autorización */

userRoutes.post("/register", register); /* registrar usuario */
userRoutes.post("/login", login); // acceder como usuario
userRoutes.post("/logout", [isAuth], logout);
userRoutes.get("/checksession", [isAuth], checkSession);

module.exports = userRoutes;
