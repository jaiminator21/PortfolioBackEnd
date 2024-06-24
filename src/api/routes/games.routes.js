const express = require("express");
const upload = require("../../middlewares/upload.file");

const {
  isAuth,
} = require("../../middlewares/auth"); 
const { getGames, postGame, putGame, deleteGame, getGameById } = require("../controllers/games.controller");


const gamesRouter = express.Router();

gamesRouter.get("/", getGames);
gamesRouter.get("/:id", getGameById);
gamesRouter.post("/",  upload.uploadMultiple , postGame);
gamesRouter.put("/:id", putGame);
gamesRouter.delete("/:id", deleteGame);

module.exports = gamesRouter;
