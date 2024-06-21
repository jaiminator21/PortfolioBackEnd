const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    genero: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    engine: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    trailer: {
      type: String,
      required: false,
    },
    images: [{
      type: String,
      required: true,
    }]
  }
);

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
