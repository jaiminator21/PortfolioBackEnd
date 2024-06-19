const User = require("../models/users.model");
const { generateSign } = require("../../utils/jwt");
const {
  validateEmail,
  validatePassword,
  usedEmail,
} = require("../../utils/validators");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  /* REGISTER */
  console.log(req);
  try {
    const newUser = new User(req.body);
    if (!validateEmail(newUser.email)) {
      return res.status(400).json({
        message:
          "El email introducido no cumple con los parámetros requeridos.",
      }); /* si la validación no pasa, error. */
    }
    if (!validatePassword(newUser.password)) {
      return res.status(400).json({
        message:
          "La contraseña introducida no cumple con los parámetros requeridos: minúscula, mayúscula, un número y un carácter especial. ",
      }); /* si la validacion de password no pasa, error */
    }
    if (await usedEmail(newUser.email)) {
      return res.status(400).json({
        message: "El email introducido ya se encuentra en uso.",
      }); /* si no pasa validación, error */
    }

    const salt = 10;
    newUser.password = bcrypt.hashSync(
      newUser.password,
      salt
    ); /* ENCRIPTAMOS LA CONTRASEÑA */
    const createdUser = await newUser.save();
    return res.status(201).json(createdUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const login = async (req, res) => {
  /* LOGIN */
  //6.generamos un token para el login generamos la funcion asincrona y lo importamos en users.routes
  try {
    const userInfo = await User.findOne({ email: req.body.email }); //comprobamos si existe lo que le estamos pasando, dentro de mi coleccion busca uno que como campo principal sea el body el email
    if (!userInfo) {
      //si no existe nos devuelve el error
      return res.status(404).json({ message: "email no existe" });
    }
    if (!bcrypt.compareSync(req.body.password, userInfo.password)) {
      //comprobamos que las contraseñas sean iguales y compara lo que viene del body con el user info
      return res.status(404).json({ message: "el password no es correcto" });
    }
    const token = generateSign(userInfo._id, userInfo.email); //8.vamos a generar el token que recibe un id y un email
    return res.status(200).json({ user: userInfo, token: token });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const logout = (req, res, next) => {
  /* LOGOUT */
  try {
    const token = null; // eliminamos token
    return res.status(200).json({
      // all okay
      status: 200,
      message: "Logout successful",
    });
  } catch (error) {
    // no se ha eliminado el token --> error
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

module.exports = {
  register,
  login,
  logout,
  checkSession,
};
