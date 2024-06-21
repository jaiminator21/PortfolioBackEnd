const multer = require("multer");
const cloudinary = require("cloudinary").v2; 
const { CloudinaryStorage } = require("multer-storage-cloudinary"); 

const storage =
//we tell it where it has to save the files, what is the CloudinarryStorage and how it has to save it
  new CloudinaryStorage(
    {
      cloudinary: cloudinary,//What library to use
      params: {
        folder: "games", //folder name
        allowedFormarts: ["jpg", "png", "jpeg", "gif", "webp", "pdf"], //file types
      },
    }
  );

  const upload = multer({ storage: storage }); // muter is the file managment
  const uploadMultiple = upload.array('images', 10);

module.exports = {upload, uploadMultiple};
