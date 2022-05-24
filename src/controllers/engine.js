import { processing } from "../engine/processing/processing.js";
import Expert from "../engine/expert/engine.js";
import Pokemon from "../schemas/pokemon.js";
import Team from "../schemas/team.js";
import Decision from "../schemas/decision.js";
import getRuleParams from "../methods/db.getRuleParams.js";
import Summary from "../schemas/summary.js";
import User from "../schemas/user.js";
import moment from "moment";

export const getProcessing = (req, res) => {
  processing();
};

export const generateTeam = async (req, res) => {
  try {
    if (
      !Object.keys(req.body).length > 0 ||
      !Object.keys(req.body).includes("enemyPokemons")
    ) {
      return res.status(400).end("Invalid data");
    }

    const facts = await findPokemons(req);
    const ruleParams = await getRuleParams();
    let dataStrong = extractRule(ruleParams, "dataStrong");
    let dataWeak = extractRule(ruleParams, "dataWeak");

    const number = facts.enemyPokemon.length;
    const engine = await Expert(number, dataStrong, dataWeak);
    let engineResult = await engine.run(facts);

    let data = returnProccessingData(engineResult, facts, dataStrong, dataWeak);
    let pokemonsMap = await createPokemonsMap();
    let processingResult = processing(data, pokemonsMap);

    if (req.email) {
      let s = await serialize(req, engineResult, facts, processingResult);
      return res.send(s);
    } else {
      const summaryBody = await buildRawResponse(
        engineResult,
        facts,
        processingResult,
        req
      );

      return res.send(summaryBody);
    }
  } catch (e) {
    if (e && e.code === 11000) {
      return res.status(422).end("Already exists");
    }
    if (e.name == "ValidationError") {
      return res.status(422).end("ValidationError");
    }
    console.error(e);
    return res.status(500).end();
  }
};

async function serialize(req, engineResult, facts, processingResult) {
  const user = await User.findOne({
    email: req.email,
  });
  let decisions = [];
  buildDecisions(engineResult, facts, decisions);
  const team = await saveTeam(processingResult, req);
  const summary = await saveSummary(
    req,
    team,
    facts,
    processingResult,
    decisions,
    user
  );
  let result = await Summary.findById(summary._id)
    .populate("facts")
    .populate("decisions");
  const t = await Team.findById(team._doc._id).populate("pokemons");

  let s = result._doc;
  s["team"] = t._doc;
  return s;
}

async function buildRawResponse(engineResult, facts, processingResult, req) {
  let decisions = [];
  for (let event of engineResult.events) {
    let pokemon = facts.enemyPokemon[event.params.id];
    if (pokemon && pokemon._id) {
      let decision = {
        name: event.type,
        pokemon: pokemon._id.toString(),
        params: {
          types: event.params.types,
        },
      };
      decisions.push(decision);
    }
  }
  let teamBody = await returnTeamBody(processingResult);
  const team = {
    pokemons: teamBody,
    name: req.body.name,
  };

  const summaryBody = {
    name: req.body.name
      ? req.body.name
      : "summary-" + moment(new Date()).format("DD-MM-YYYY"),
    team: team,
    date: moment(new Date()).format("YYYY/MM/DD"),
    facts: facts.enemyPokemon,
    alternatives: processingResult.alternatives,
    spectrum: processingResult.spectrum,
    decisions: decisions,
    public: req.body.public ? req.body.public : false,
  };
  return summaryBody;
}

async function saveSummary(
  req,
  team,
  facts,
  processingResult,
  decisions,
  user
) {
  const summaryBody = {
    name: req.body.name
      ? req.body.name
      : "summary-" + moment(new Date()).format("DD-MM-YYYY"),
    team: team._doc._id.toString(),
    date: moment(new Date()).format("YYYY/MM/DD"),
    user: user._doc._id.toString(),
    facts: facts.enemyPokemon,
    alternatives: processingResult.alternatives,
    spectrum: processingResult.spectrum,
    decisions: decisions,
    public: req.body.public ? req.body.public : false,
  };
  const summary = await new Summary(summaryBody).save();
  return summary;
}

async function saveTeam(processingResult, req) {
  let teamBody = await returnTeamBody(processingResult);
  const team = await new Team({
    pokemons: teamBody,
    name: req.body.name,
  }).save();
  return team;
}

async function returnTeamBody(processingResult) {
  let teamBody = [];
  for (let p of processingResult.mainPick) {
    const poke = await Pokemon.findOne({
      name: p,
    });
    teamBody.push(poke._doc._id.toString());
  }
  return teamBody;
}

function returnProccessingData(engineResult, facts, dataStrong, dataWeak) {
  let data = {};
  for (let event of engineResult.events) {
    if (event.type === "counters") {
      data.strongCounter = event.params.strong;
      data.weakCounter = event.params.weak;
    }
  }
  data.enemies = [];
  for (let enemy of facts.enemyPokemon) {
    var typesStrong = [];
    var typesWeak = [];
    for (let t of enemy.types) {
      typesStrong.push(...dataStrong[t]);
      typesWeak.push(...dataWeak[t]);
    }

    data.enemies.push({
      strong: [...new Set(typesStrong)],
      weak: [...new Set(typesWeak)],
    });
  }
  return data;
}

async function buildDecisions(engineResult, facts, decisions) {
  for (let event of engineResult.events) {
    let pokemon = facts.enemyPokemon[event.params.id];
    if (pokemon && pokemon._id) {
      let decision = await new Decision({
        name: event.type,
        pokemon: pokemon._id.toString(),
        params: {
          types: event.params.types,
        },
      }).save();
      decisions.push(decision._doc._id);
    }
  }
}

function extractRule(ruleParams, paramName) {
  let obj = {};
  for (let param of ruleParams) {
    if (param[paramName]) {
      obj = param[paramName];
    }
  }
  return obj;
}

async function findPokemons(req) {
  const facts = {
    enemyPokemon: [],
    returnCounters: true,
  };

  for (let pId of req.body.enemyPokemons) {
    let pokemon = await Pokemon.findById(pId).populate("types");
    let typesNames = pokemon._doc.types.map((type) => type.name);
    pokemon._doc["types"] = typesNames;
    facts.enemyPokemon.push(pokemon._doc);
  }

  return facts;
}

async function createPokemonsMap() {
  let pokemons = await Pokemon.find({}).populate("types");
  let pokemonsMap = {};
  pokemons.forEach((p) => {
    let typesNames = p._doc.types.map((type) => type.name);
    pokemonsMap[p._doc.name] = typesNames;
  });
  return pokemonsMap;
}
