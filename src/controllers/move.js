import Move from "../schemas/move.js";
import Type from "../schemas/type.js";

export const postMove = async (req, res) => {
	// Admin
	try {
		if (req.roles.map((e) => e.name).includes("admin")) {
			const move = await Move(req.body).save();
			return res.send(move._doc);
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

export const getMoveById = async (req, res) => {
	try {
		const move = await Move.findOne({
			_id: req.params.id,
		}).populate("type");
		return res.send(move);
	} catch (e) {
		console.error(e);
		res.status(500).end();
	}
};

export const patchMoveById = async (req, res) => {
	// Admin
	try {
		if (req.roles.map((e) => e.name).includes("admin")) {
			await Move.findByIdAndUpdate(req.params.id, req.body);
			const move = await Move.findById(req.params.id).populate("type");
			if (!move) return res.status(404).end("Not found");
			return res.send(move);
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

export const deleteMoveById = async (req, res) => {
	// Admin
	try {
		if (req.roles.map((e) => e.name).includes("admin")) {
			const move = await Move.findByIdAndDelete(req.params.id);
			if (!move) return res.status(404).end("Not found");
			return res.status(200).end("Deleted");
		}
		return res.status(401).end("Not authorized");
	} catch (e) {
		console.error(e);
		res.status(500).end();
	}
};

export const getMoves = async (req, res) => {
	try {
		const moves = await Move.find().populate("type");
    if (!moves) return res.status(404).end("Not found");
		return res.send(moves);
	} catch (e) {
		console.error(e);
		res.status(500).end();
	}
};
