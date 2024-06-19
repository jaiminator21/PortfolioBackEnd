const multer = require("multer"); /* nos traemos multer para gestionar archivos */
const cloudinary = require("cloudinary").v2; /* traemos cloudinary */
const {
  CloudinaryStorage,
} = require("multer-storage-cloudinary"); /* esto es la otra libreria instalada */

const storage =
  new CloudinaryStorage /* aqui le decimos donde tiene que guardar, que es el alamacen CloudinaryStorage y como lo tiene que guardar */(
    {
      cloudinary: cloudinary /* utilizamos la libreria cloudinary */,
      params: {
        /* los parametros que necesita es el monbre de la carpeta y los tipos de formato que soporta */
        folder: "libreria",
        allowedFormarts: ["jpg", "png", "jpeg", "gif", "webp", "pdf"],
      },
    }
  );

const upload = multer({
  storage,
}); /* esto es el multer, para ver como gestiona los archivos */

module.exports = upload;
