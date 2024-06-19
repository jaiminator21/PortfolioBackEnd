const Game = require("../models/games.model"); /* importamos el libro modelo */
const { deleteFile } = require("../../middlewares/delete.file");

const getGames = async (req, res) => {
  try {
    const allpeliculas = await pelicula.find();
    return res.status(200).json(allpeliculas);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const postGame = async (req, res) => {
  try {
    const newGame = new Game(req.body);
    if (req.file) {
      newGame.logo = req.file.path;
    }
    const createdGame = await newGame.save();
    return res.status(201).json(createdGame);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const putGame = async (req, res) => {

  try {
    const { id } =
      req.params; /* la id que viene de req.params va con {} porque desestruccturamos el objeto */
    const putGame = new Game(
      req.body
    ); /* que nos pase por la validación y tiene que pasar por el req.body */
    putGame._id = id; /* convertimos el _id del postman a id */
    const updateGame = await Game.findByIdAndUpdate(
      id,
      putGame
    ); /*si cuadra la validacion esta pelicula dentro de la coleccion pelicula, busca el id y va a meter el put que es la validación  */
    if (!updateGame) {
      return res
        .status(404)
        .json({ message: "el id de eta pelicula no existe" });
    }
    return res.status(200).json(updateGame); /* si funciona devuelve 200 */
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteGame = async (req, res) => {
  try {
    const { id } = req.params; /* cogemos el id de los parametros */
    const deleteGame = await Game.findByIdAndDelete(
      id
    ); /* lo busca y lo elimina */
    if (!deleteGame) {
      return res.status(404).json({ message: "el id no existe" });
    }
    if (deleteGame.logo.includes("cloudinary")) {
      deleteFile(deleteGame.logo);
    }
    if (deleteGame.images.includes("cloudinary")) {
      deleteFile(deleteGame.logo);
    }
    return res.status(200).json(deleteGame);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { getGames, postGame, putGame, deleteGame };
