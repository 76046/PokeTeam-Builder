import { processing } from "../engine/processing/processing.js";
import Expert from "../engine/expert/engine.js";

export const getProcessing = (req, res) => {
  processing();
};

export const generateTeam = async (req, res) => {
  const facts = req.body;

  const number = facts.enemyPokemon.length;
  const engine = Expert(number);

  let result = await engine.run(facts);
  return res.send(result);
};
