import { processing } from "../engine/processing/processing.js";
import Expert from "../engine/expert/engine.js";
import Pokemon from "../schemas/pokemon.js";
import Team from "../schemas/team.js";
import Decision from "../schemas/decision.js";
import getRuleParams from "../methods/db.getRuleParams.js";
import Summary from "../schemas/summary.js";

export const getProcessing = (req, res) => {
  processing();
};

export const generateTeam = async (req, res) => {
  try {
    if (!req.body.enemyPokemons || !req.body.name) {
      return res.status(400).end("Invalid data");
    }
    const facts = await findPokemons(req);
    const ruleParams = await getRuleParams();
    let dataStrong = extractRule(ruleParams, "dataStrong");
    let dataWeak = extractRule(ruleParams, "dataWeak");
    let decisions = [];

    const number = facts.enemyPokemon.length;
    const engine = await Expert(number, dataStrong, dataWeak);
    let engineResult = await engine.run(facts);
    buildDecisions(engineResult, facts, decisions);

    let data = returnProccessingData(engineResult, facts, dataStrong, dataWeak);
    let pokemonsMap = await createPokemonsMap();
    let processingResult = processing(data, pokemonsMap);
    const team = await saveTeam(processingResult, req);
    const summary = await saveSummary(
      req,
      team,
      facts,
      processingResult,
      decisions
    );
    let result = await Summary.findById(summary._id)
      .populate("team")
      .populate("facts")
      .populate("decisions");
    return res.send(result);
  } catch (e) {
    if (e && e.code === 11000) {
      return res.status(422).end("Already exists");
    }
    if (e.name == "ValidationError") {
      return res.status(422).end("ValidationError");
    }
    console.error(e);
    res.status(500).end();
  }
};

async function saveSummary(req, team, facts, processingResult, decisions) {
  const summaryBody = {
    name: "summary-" + req.body.name,
    team: team._doc._id.toString(),
    date: new Date(),
    facts: facts.enemyPokemon,
    alternatives: processingResult.alternatives,
    spectrum: processingResult.spectrum,
    decisions: decisions,
  };
  const summary = await new Summary(summaryBody).save();
  return summary;
}

async function saveTeam(processingResult, req) {
  let teamBody = await returnTeamBody(processingResult);
  const team = await new Team({
    pokemons: teamBody,
    name: req.body.name,
    public: req.body.public ? req.body.public : false,
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
    for (let t of enemy.types) {
      data.enemies.push({
        strong: dataStrong[t],
        weak: dataWeak[t],
      });
    }
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
