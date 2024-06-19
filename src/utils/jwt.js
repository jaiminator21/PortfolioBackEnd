const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateSign = (id, email) => {
  /* generamos el token */
  return jwt.sign({ id, email }, process.env.JWT_KEY, {
    expiresIn: "9999h",
  }); /* quiero que utilices esta llave para que devuelvas un token encriptado que contenga la id y el email del usuario. El token tiene validez durante 1 hora. */
};
const verifySign = (token) => {
  return jwt.verify(
    token,
    process.env.JWT_KEY
  ); /* recibe un token y hace la comprobación del token, es como si lo desencriptara con la llave que le hemos especificado en JWT_KEY para ver si se abre o no */
  /* cuento para Helena: creamos una cerradura (token) y creamos una llave (JWT_KEY), para verificar la cerradura intentamos abrirla con la llave, si se abre es que es nuestra cerradura */
};

module.exports = { generateSign, verifySign };
