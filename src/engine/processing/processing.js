const data = {
	enemies: [
		{
			strong: ["flying", "poison", "bug", "fire", "ice", "ground", "psychic"],
			weak: ["ground", "rock", "water", "grass", "fairy"],
		},
		{
			strong: ["flying", "rock", "fire", "poison", "bug", "ice"],
			weak: ["grass", "psychic", "dark"],
		},
		{
			strong: ["ground", "fight", "fire"],
			weak: ["flying", "water", "rock", "ice", "fairy"],
		},
	],

	strongCounter: {
		bug: 2,
		fight: 1,
		fire: 4,
		flying: 3,
		ground: 3,
		ice: 2,
		poison: 2,
		psychic: 1,
		rock: 1,
	},

	weakCounter: {
		dark: 1,
		fairy: 2,
		flying: 1,
		grass: 2,
		ground: 1,
		ice: 1,
		psychic: 1,
		rock: 2,
		water: 2,
	},
};

const pokemons = {
	pokemon1: ["ground", "fight"],
	pokemon2: ["dark", "fight"],
	pokemon3: ["grass"],
	pokemon4: ["ground"],
	pokemon5: ["ground", "ice"],
	pokemon6: ["ice", "fight"],
	pokemon7: ["rock", "fire"],
	pokemon8: ["ground", "fight"],
	pokemon9: ["water", "bug"],
	pokemon10: ["fairy", "fight"],
};

  export const processing = () => {
	let valuesOfAttribute;
	const valuesOfEnemy = [];
	const rounding = 100;

	data.enemies.forEach((enemy) => {
		valuesOfAttribute = {};

		enemy.strong.forEach((element) => {
			const weak = data.weakCounter[element] ?? 0;
			const strong = data.strongCounter[element] ?? 0;
			const strongType = (100 * strong) / (weak + 1);
			valuesOfAttribute[element] = Math.floor(strongType) / 100;
		});

		enemy.weak.forEach((element) => {
			const weak = data.weakCounter[element] ?? 0;
			const strong = data.strongCounter[element] ?? 0;
			const weakType = (100 * weak) / (strong + 1);
			const score = valuesOfAttribute[element] ?? 0;
			valuesOfAttribute[element] = Math.floor(score - weakType) / 100;
		});
		valuesOfEnemy.push(valuesOfAttribute);
	});

	//console.log(valuesOfEnemy);
	
	const scores = valuesOfEnemy.map((enemy) =>
		Object.entries(pokemons).reduce(
			(obj, [name, pokemon]) => ({
				...obj,
				[name]: pokemon.reduce((sum, type) => sum + (enemy[type] ?? 0), 0),
			}),
			{}
		)
	);
	
	//console.log(scores);

	const validScores = scores.map((enemy) => {
		const invalid = Object.keys(enemy).filter((key) => enemy[key] <= 0);
		invalid.forEach((key) => {
			delete enemy[key];
		});
		return enemy;
	});

	//console.log(validScores);

	let listAlternativePokemons = {};
	let pickPokemonTable = [];
	let index = 0;

	validScores.forEach((element) => {

		const sum = Object.values(element).reduce((sum, value) => sum + value, 0);

		//console.log(sum);

		Object.keys(element).map(
			(key, index) => {
				element[key] = element[key] / sum	
			}
		);
		
		const object = Object.fromEntries(
			Object.entries(element).sort(([,a],[,b]) => b-a)
		);
	
		element = object
		
		//console.log(element);

		const random = Math.random();
		//console.log('Randomowa: '+random);

		let valueOfPokemon = 0;
		
		let pickedPokemon = '';

		let alternativePokemon = new Array();

		Object.entries(element).some(value => {
			valueOfPokemon += value[1];
			//console.log(valueOfPokemon);
			if(random <= valueOfPokemon){
				pickPokemonTable.push(value[0]);
				pickedPokemon = value[0];
			}
			return random <= valueOfPokemon;
		});
		
		//console.log(pickedPokemon);

		Object.entries(element).some(value => {
			
			if(alternativePokemon.length < 3 && value[0] !== pickedPokemon){
				alternativePokemon.push(value[0])
			}
		});	
		listAlternativePokemons[index] = alternativePokemon;
		index++;
	});

	
	
	let valuesOfSpectrum = {};

	Object.entries(data.strongCounter).forEach(([elementKey,]) => {
		const weak = data.weakCounter[elementKey] ?? 0;
		const strong = data.strongCounter[elementKey] ?? 0;
		const strongType = (100 * strong) / (weak + 1);
		valuesOfSpectrum[elementKey] = Math.floor(strongType) / 100;
	});

	Object.entries(data.weakCounter).forEach(([elementKey,]) => {
		const weak = data.weakCounter[elementKey] ?? 0;
		const strong = data.strongCounter[elementKey] ?? 0;
		const weakType = (100 * weak) / (strong + 1);
		const score = valuesOfSpectrum[elementKey] ?? 0;
		valuesOfSpectrum[elementKey] = Math.floor(score - weakType) / 100;
		
	});

	valuesOfSpectrum = Object.fromEntries(
					Object.entries(valuesOfSpectrum).sort(([,a],[,b]) => b-a)
				);	

	console.log('Wynik główny:');
	// console.log(pickPokemonTable);
	// console.log(listAlternativePokemons);
	// console.log(valuesOfSpectrum);

	let outputData = {'mainPick':pickPokemonTable,'alternatives':listAlternativePokemons,'spectrum':valuesOfSpectrum}

	console.log(outputData);

	return outputData;
};
