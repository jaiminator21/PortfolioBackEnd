const cloudinary = require("cloudinary").v2;

const deleteFile = (url) => {
  const imgSplitted = url.split("/"); // generar un array de cada elemento que esta separado por /

  const nameSplitted = imgSplitted[imgSplitted.length - 1].split("."); // estoy haciendo un array que me separe el nombre de la imagen de su extension

  const folder =
    imgSplitted[
      imgSplitted.length - 2
    ]; /* la carpeta de donde lo estamos guardando */

  const imgToDelete = `${folder}/${nameSplitted[0]}`; /* guardamos valores para decirle donde lo queremos eliminar */

  cloudinary.uploader.destroy(imgToDelete, () =>
    console.log("imagen borrada")
  ); /* segun tengamos la imagen, que elimine el archivo */
};
module.exports = { deleteFile };
