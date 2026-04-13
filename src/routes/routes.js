import express from "express";
import {
  getGames,
  getGame,
  createGame,
} from "../controller/game.controller.js";

const gameRoute = express.Router();

gameRoute.get("/get-all-game", getGames);
gameRoute.get("/game/:slug", getGame);
gameRoute.post("/create-game", createGame);

export default gameRoute;