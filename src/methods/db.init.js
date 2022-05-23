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
    bulbasaur: 5,
    ivysaur: 22,
    venusaur: 34,
    charmander: 5,
    charmeleon: 22,
    charizard: 34,
    squirtle: 5,
    wartortle: 22,
    blastoise: 34,
    caterpie: 4,
    metapod: 15,
    butterfree: 25,
    weedle: 4,
    kakuna: 15,
    beedrill: 25,
    pidgey: 4,
    pidgeotto: 15,
    pidgeot: 25,
    rattata: 4,
    raticate: 16,
    spearow: 5,
    fearow: 18,
    ekans: 5,
    arbok: 15,
    rikachu: 8,
    raichu: 24,
    sandshrew: 8,
    sandslash: 24,
    nidoran: 8,
    nidorina: 24,
    nidoqueen: 36,
    nidoran: 8,
    nidorino: 24,
    nidoking: 36,
    clefairy: 8,
    clefable: 20,
    vulpix: 6,
    ninetales: 22,
    jigglypuff: 6,
    wigglytuff: 22,
    zubat: 4,
    golbat: 18,
    oddish: 6,
    gloom: 18,
    vileplume: 30,
    paras: 8,
    parasect: 22,
    venonat: 8,
    venomoth: 22,
    diglett: 8,
    dugtrio: 22,
    meowth: 6,
    persian: 18,
    psyduck: 8,
    golduck: 22,
    mankey: 8,
    primeape: 22,
    growlithe: 8,
    arcanine: 28,
    poliwag: 8,
    poliwhirl: 22,
    poliwrath: 34,
    abra: 8,
    kadabra: 18,
    alakazam: 30,
    machop: 8,
    machoke: 18,
    machamp: 30,
    bellsprout: 6,
    weepinbell: 18,
    victreebel: 28,
    tentacool: 8,
    tentacruel: 24,
    geodude: 8,
    graveler: 22,
    golem: 30,
    ponyta: 8,
    rapidash: 22,
    slowpoke: 8,
    slowbro: 22,
    magnemite: 8,
    magneton: 16,
    "farfetch'd": 16,
    doduo: 8,
    dodrio: 16,
    seel: 8,
    dewgong: 22,
    grimer: 8,
    muk: 22,
    shellder: 8,
    cloyster: 22,
    gastly: 8,
    haunter: 22,
    gengar: 34,
    onix: 12,
    drowzee: 26,
    hypno: 20,
    krabby: 8,
    kingler: 24,
    voltorb: 8,
    electrode: 22,
    exeggcute: 8,
    exeggutor: 30,
    cubone: 8,
    marowak: 24,
    hitmonlee: 22,
    hitmonchan: 22,
    lickitung: 24,
    koffing: 8,
    weezing: 22,
    rhyhorn: 12,
    rhydon: 28,
    chansey: 26,
    tangela: 16,
    kangaskhan: 22,
    horsea: 10,
    seadra: 28,
    goldeen: 8,
    seaking: 22,
    staryu: 8,
    starmie: 24,
    "mr. mime": 18,
    scyther: 18,
    jynx: 18,
    electabuzz: 22,
    magmar: 22,
    pinsir: 18,
    tauros: 20,
    magikarp: 6,
    gyarados: 34,
    lapras: 24,
    ditto: 12,
    eevee: 12,
    vaporeon: 26,
    jolteon: 26,
    flareon: 26,
    porygon: 12,
    omanyte: 10,
    omastar: 26,
    kabuto: 10,
    kabutops: 26,
    aerodactyl: 22,
    snorlax: 24,
    articuno: 50,
    zapdos: 50,
    moltres: 50,
    dratini: 12,
    dragonair: 26,
    dragonite: 34,
    mewtwo: 60,
    mew: 55,
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
