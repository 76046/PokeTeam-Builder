import "dotenv/config";
import Type from "../schemas/type.js";
import Move from "../schemas/move.js";
import Pokemon from "../schemas/pokemon.js";
import fs from "fs";
import readline from "readline";
import "dotenv/config";
import axios from "axios";
import connect from "./db.connection.js";

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

  const pokemonsNames = {
    charizard: 34,
    torterra: 34,
    goomy: 22,
    litten: 1,
    kangaskhan: 25,
    pheromosa: 42,
    duosion: 20,
    greninja: 32,
    absol: 25,
    sandshrew: 10,
    sylveon: 22,
    audino: 25,
    maractus: 30,
    koffing: 10,
    machoke: 18,
    garchomp: 42,
    weavile: 30,
    pupitar: 18,
    tirtouga: 22,
    gothorita: 18,
    copperajah: 42,
    elekid: 5,
  };

  for (let pokemonName of Object.keys(pokemonsNames)) {
    const res = await axios
      .get("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
      .catch((error) => {
        console.error(error);
      });

    if (res) {
      const data = res.data;

      let pokemon = {
        name: capitalize(pokemonName),
        types: [],
        min_level: parseInt(pokemonsNames[pokemonName]),
        basic_stats: [],
        moves: [],
        sprites: [
          "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" +
            String(data.id).padStart(3, "0") +
            ".png",
        ],
      };

      for (let t of data.types) {
        const typeArr = await Type.find({
          name: t.type.name,
        });
        if (typeArr.length > 0) {
          pokemon.types.push(typeArr[0]._id.toString());
        }
      }

      for (let m of data.moves) {
        let name = transformName(m.move.name);
        const moveArr = await Move.find({
          name: name,
        });
        if (moveArr.length > 0) {
          pokemon.moves.push(moveArr[0]._id.toString());
        }
      }

      for (let i = 0; i < data.stats.length; i++) {
        pokemon.basic_stats[i] = data.stats[i].base_stat;
      }

      const p = new Pokemon(pokemon).save();
    }
  }
};

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

const transformName = (name) => {
  let result = "";
  if (name.includes("-")) {
    result +=
      capitalize(name.split("-")[0]) + " " + capitalize(name.split("-")[1]);
  } else {
    result = capitalize(name);
  }
  return result;
};

export default init;
