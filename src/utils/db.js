const mongoose = require("mongoose"); /*si trabajamos en remoto*/
require("dotenv").config(); /*DOTENV ENCRIPTA*/

const DB_URL = process.env.DB_URL; /* ESTAMOS INVOCANDO LA URL DENTRO DE .ENV */

const connect = async () => {
  try {
    const db = await mongoose.connect(DB_URL);
    const { name, host } =
      db.connection; /* guardamos name y host que viene de la conexión de la url */

    console.log(
      `Conectado a la base de datos ${name} DB en el host ${host}`
    ); /* nos devuelve la info de quien está conectado y donde */
  } catch (error) {
    console.log("Error al conectar con nuestra base de datos", error);
  }
};

module.exports = { connect }; /* nos interesa tenerla en index, no aquí */
