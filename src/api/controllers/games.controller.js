const Game = require("../models/games.model"); // Import the Game model 
const { deleteFile } = require("../../middlewares/delete.file"); // Import the deleteFile function 
const cloudinary = require('cloudinary').v2;


const getGames = async (req, res) => {
  try {
    const allpeliculas = await Game.find(); // Retrieve all games from the database using the Game model
    return res.status(200).json(allpeliculas); // Return a JSON response with status 200 containing all games
  } catch (error) {
    return res.status(500).json(error); // If an error occurs, return the error msg
  }
};

 const postGame = async (req, res) => {
  console.log('req.body:', req.body); // Log para verificar los datos de texto
  console.log('req.files:', req.files); // Log para verificar los archivos subidos
  try {
    const newGame = new Game(req.body); // Create a new Game instance with data from the req.body
    
    if (req.files) {
      // If there are images, map them into the array
      newGame.images = req.files.map(file => file.path);
    }
    newGame.images
    const createdGame = await newGame.save(); // Save the new game to the database
    return res.status(201).json(createdGame); // Return a JSON response with status 201 containing the created game
  } catch (error) {
    return res.status(500).json(error); // If an error occurs, return a JSON response with status 500 and the error message
  }
}; 


const putGame = async (req, res) => {
  try {
    const { id } = req.params; // Extract the game ID from the request parameters
    const putGame = new Game(req.body); // Create a new Game instance with updated data from the request body
    putGame._id = id; // Set the ID of the game instance to update
    const updateGame = await Game.findByIdAndUpdate(
      id,
      putGame
    ); // Find the game by ID and update it with the new game instance
    if (!updateGame) {
      return res
        .status(404)
        .json({ message: "The game ID does not exist" }); // If the game ID doesn't exist, return a JSON response with status 404
    }
    return res.status(200).json(updateGame); // Return a JSON response with status 200 containing the updated game
  } catch (error) {
    return res.status(500).json(error); // If an error occurs, return a JSON response with status 500 and the error message
  }
};

const deleteGame = async (req, res) => {
  try {
    const { id } = req.params; // Extract the game ID from the request parameters
    const deleteGame = await Game.findByIdAndDelete(id); // Find the game by ID and delete it from the database
    if (!deleteGame) {
      return res.status(404).json({ message: "The game ID does not exist" }); // If the game ID doesn't exist, return a JSON response with status 404
    }
    if (deleteGame.images.includes("cloudinary")) {
      deleteFile(deleteGame.images); // If the game's logo is stored in Cloudinary, delete it using deleteFile function
    }
    if (deleteGame.images.includes("cloudinary")) {
      deleteFile(deleteGame.logo); // If any of the game's images are stored in Cloudinary, delete them using deleteFile function
    }
    return res.status(200).json(deleteGame); // Return a JSON response with status 200 containing the deleted game
  } catch (error) {
    return res.status(500).json(error); // If an error occurs, return a JSON response with status 500 and the error message
  }
};

module.exports = { getGames, postGame, putGame, deleteGame }; // Export the functions getGames, postGame, putGame, and deleteGame for use in other files
