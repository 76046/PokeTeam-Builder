import { Router } from "express";
import * as controller from "../controllers/pokemon.js";
import auth from "../middleware/auth.js";

const router = Router();

// # == Pokemon

router.post("/", auth, controller.postPokemon); // Admin
router.get("/pokemons", controller.getPokemons);
router.get("/:id", controller.getPokemonById);
router.patch("/:id", auth, controller.patchPokemonById); // Admin
router.delete("/:id", auth, controller.deletePokemonById); // Admin

export default router;
