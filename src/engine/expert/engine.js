import { ruleStrong, ruleWeak, ruleCounters } from "./generators.js";
import { Engine } from "json-rules-engine";

const config = {
  allowUndefinedFacts: true,
};

// const rules = (cache) => [
//   ...Object.entries(dataStrong).map(([key, value]) =>
//     ruleStrong(key, value, cache)
//   ),
//   ...Object.entries(dataWeak).map(([key, value]) =>
//     ruleWeak(key, value, cache)
//   ),
//   ruleCounters(cache),
// ];

const createCacheForRules = async (cache, number, dataStrong, dataWeak) => {
  const strong = [];
  const weak = [];

  for (let i = 0; i < number; i++) {
    strong.push(
      ...Object.entries(dataStrong).map(([key, value]) =>
        ruleStrong(i, key, value, cache)
      )
    );
  }

  for (let i = 0; i < number; i++) {
    weak.push(
      ...Object.entries(dataWeak).map(([key, value]) =>
        ruleWeak(i, key, value, cache)
      )
    );
  }

  // console.log(strong);
  // console.log(weak);
  const counters = ruleCounters(cache);

  return [...strong, ...weak, counters];
};

// let facts = // let facts = {
//   enemyPokemon: [
//     { name: "Garchomp", types: ["figth", "ground"] },
//     { name: "Ludicolo", types: ["water", "grass"] },
//     { name: "Charmander", types: ["fire"] },
//   ],
//   returnCounters: true,
// };
// let engine = new Engine(rules(createCache(), 3), config);
// engine
//   .run(facts)
//   .then((engine) => console.log(JSON.stringify(engine.events, null, 2)));

export default async function Expert(number, dataStrong, dataWeak) {
  const rules = await createCacheForRules(
    createCache(),
    number,
    dataStrong,
    dataWeak
  );
  return new Engine(rules, config);
}

function createCache() {
  return {
    strongCounter: {},
    weakCounter: {},
  };
}
