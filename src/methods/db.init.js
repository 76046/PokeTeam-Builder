import connect from "./db.connection.js";
import Type from "../schemas/type.js";
import Move from "../schemas/move.js";
import fs from "fs";
import readline from "readline";
import "dotenv/config";

async function processLineByLine() {
  const moves = [];
  const fileStream = fs.createReadStream("src/methods/moves.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const splitted = line.split("\t");
    moves.push({
      name: splitted[1],
      type: splitted[2],
      category: splitted[3].toUpperCase(),
      pp: splitted[4] != "—" ? parseInt(splitted[4]) : null,

      power: splitted[5] != "—" ? parseInt(splitted[5]) : null,
      accuracy: splitted[6] != "—" ? parseInt(splitted[6]) : null,
      generation: splitted[7] != "-" ? splitted[7] : null,
    });
  }

  return moves;
}

const init = async () => {
  const types = [
    "normal",
    "fire",
    "water",
    "grass",
    "flying",
    "fighting",
    "poison",
    "electric",
    "ground",
    "rock",
    "psychic",
    "ice",
    "bug",
    "ghost",
    "steel",
    "dragon",
    "dark",
    "fairy",
  ];

  for (let type of types) {
    const model = new Type({
      name: type,
    });
    try {
      await model.save();
    } catch (e) {}
  }
  const moves = await processLineByLine();

  for (let move of moves) {
    const type = await Type.find({
      name: move.type.toLowerCase(),
    });
    move.type = type[0]._id;
    const model = new Move(move);
    try {
      await model.save();
    } catch (e) {}
  }
};

export default init;
