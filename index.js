const express = require("express"); /* EXPRESS maneja el servidor a nivel LOCAL*/
const {
  connect,
} = require("./src/utils/db"); /* importamos la función connect de utils/db */
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const cloudinary = require("cloudinary").v2;

const gamesRouter = require("./src/api/routes/games.routes");
const userRoutes = require("./src/api/routes/users.routes");

const PORT = process.env.PORT;

cloudinary.config({
  /* lo importamos antes de que se inicie el servidor local */
  cloud_name:
    process.env
      .CLOUDINARY_NAME /* lo enlazamos con el back para saber donde tiene que subir */,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const app =
  express(); /* cada vez que invocamos express lo hacemos a través de app */
connect(); /* la connectamos pero da ERROR porque no tiene la URL correcta */

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Method",
    "GET"
  ); /* header del html de respuesta */
  /* Metodos que permitimos hacer a alguien, en este caso como el usuario solo va a poder hacer un GET de info no ponemos el resto (DELETE, POST, etc.*/
  res.header("Access-Control-Allow-Credentials", "true");
  /* CREDENCIALES con el TOKEN. si no aparece esto nunca podríamos atacar al token, que va dentro del header de respuesta que recibimos. Con esto permitimos la conexion con el token */
  res.header("Access-Control-Allow-Headers", "Content-Type");
  /* Permitimos los header del tipo content-type */
  next(); /* le decimos que pase a la siguiente función, que no se quede aquí */
});

app.use(
  cors(
    /* le decimos que puede entrar todo el mundo, desde cualquier tipo de ip, ruta, etc. */
    {
      origin: "*" /* todas las conexiones */,
      credentials: true,
    }
  )
);

app.use(express.json()); /* le decimos que sepa leer peticiones de tipo post */

/*ponemos 1ª el endpoint de peliculas porque es el primero que lee e interpreta*/
app.use("/games", gamesRouter);
app.use("/users", userRoutes);


/*  DEFINIR EL PUERTO E INICIAR LA ESCUCHA */
app.listen(PORT, () =>
  console.log(`Escuchando en el puerto http://localhost:${PORT}`)
);
