const cloudinary = require("cloudinary").v2;

const deleteFile = (url) => {
  // 1. Extract Public ID from URL
  const imgSplitted = url.split("/");
  const nameSplitted = imgSplitted[imgSplitted.length - 1].split(".");
  const folder = imgSplitted[imgSplitted.length - 2];
  const imgToDelete = `${folder}/${nameSplitted[0]}`;

  // 2. Delete Image using Cloudinary Uploader
  cloudinary.uploader.destroy(imgToDelete, (error, result) => {
    if (error) {
      console.error("Error deleting image:", error);
    } else {
      console.log("Imagen borrada" /* Image deleted (Spanish) */);
    }
  });
};

module.exports = { deleteFile };
