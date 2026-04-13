import express from "express";
import {
  getGames,
  getGame,
  createGame,
} from "../controller/game.controller.js";

import {signupAdmin, loginAdmin} from "../controller/admin.controller.js"

const router = express.Router();

router.get("/get-all-game", getGames);
router.get("/:slug", getGame);
router.post("/create-game", createGame);


router.post("/signup", signupAdmin);
router.post("/login", loginAdmin)

export default router;