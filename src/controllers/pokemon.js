import Pokemon from "../schemas/pokemon.js";

export const postPokemon = async (req, res) => {
	// Admin
	try {
		if (req.roles.map((e) => e.name).includes("admin")) {
			const pokemon = await Pokemon(req.body).save();
			return res.send(pokemon._doc);
		}
		return res.status(401).end("Not authorized");
	} catch (e) {
		if (e.name == "ValidationError") {
			return res.status(422).end("ValidationError");
		}
		console.error(e);
		res.status(500).end();
	}
};

export const getPokemonById = async (req, res) => {
	try {
		const pokemon = await Pokemon.findOne({
			_id: req.params.id,
		})
			.populate("moves")
			.populate("types");
		if (!pokemon) return res.status(404).end("Not found");
		return res.send(pokemon);
	} catch (e) {
		console.error(e);
		res.status(500).end();
	}
};

export const patchPokemonById = async (req, res) => {
	// Admin
	try {
		if (req.roles.map((e) => e.name).includes("admin")) {
			await Pokemon.findByIdAndUpdate(req.params.id, req.body);
			const pokemon = await Pokemon.findById(req.params.id)
				.populate("moves")
				.populate("types");
			if (!pokemon) return res.status(404).end("Not found");
			return res.send(pokemon);
		}
		return res.status(401).end("Not authorized");
	} catch (e) {
		if (e.name == "ValidationError") {
			return res.status(422).end("ValidationError");
		}
		console.error(e);
		res.status(500).end();
	}
};

export const deletePokemonById = async (req, res) => {
	// Admin
	try {
		if (req.roles.map((e) => e.name).includes("admin")) {
			const pokemon = await Pokemon.findByIdAndDelete(req.params.id);
			if (!pokemon) return res.status(404).end("Not found");
			return res.status(200).end("Deleted");
		}
		return res.status(401).end("Not authorized");
	} catch (err) {
		console.error(e);
		res.status(500).end();
	}
};

export const getPokemons = async (req, res) => {
	try {
		const pokemon = await Pokemon.find().populate("moves").populate("types");
		if (!pokemon) return res.status(404).end("Not found");
		return res.send(pokemon);
	} catch (e) {
		console.error(e);
		res.status(500).end();
	}
};
