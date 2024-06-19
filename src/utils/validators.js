/* VALIDADORES DE USER */
/* regexr.com --> pagina para conseguir los validadores */
const User = require("../api/models/users.model");

const validateEmail = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(String(email).toLocaleLowerCase());
  /* validación de email. si el email pasa la validación, nos convierte el email en un string en minúsculas. */
};
const validatePassword = (password) => {
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return regex.test(String(password));
  /* validación de password, si pasa la validación lo convierte en string */
};
const usedEmail = async (email) => {
  /* esta función es async porque tiene que hacer una petición independiente. */
  const users = await User.find({
    email: email,
  }); /* en nuestra colección vas a buscar dentro del campo email si existe el email que te estoy pasando  */
  return users.length; /* nos devuelve la lista de usuarios que cumplen con la condición. Si nos devuelve un 0 bien, si nos devuelve un 1 significa que ya hay otro usuario registrado con ese correo electrónico dentro de nuestra DDBB */
};

module.exports = { validateEmail, validatePassword, usedEmail };
