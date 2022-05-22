import Summary from "../schemas/summary.js";

export const postSummary = async (req, res) => {
	try {
		if (req.roles.map((e) => e.name).includes("user")) {
			const summary = await Summary(req.body).save();
			if (!summary) return res.status(404).end("Not found");
			return res.send(summary._doc);
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

export const getSummaryById = async (req, res) => {
	try {
		if (req.roles.map((e) => e.name).includes("user")) {
			const summary = await Summary.findOne({
				_id: req.params.id,
			});
			if (!summary) return res.status(404).end("Not found");
			return res.send(summary);
		}
		return res.status(401).end("Not authorized");
	} catch (e) {
		console.error(e);
		res.status(500).end();
	}
};

export const patchSummaryById = async (req, res) => {
	try {
		if (req.roles.map((e) => e.name).includes("admin")) {
			await Summary.findByIdAndUpdate(req.params.id, req.body);
			const summary = await Summary.findById(req.params.id);
			if (!summary) return res.status(404).end("Not found");
			return res.send(summary);
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

export const deleteSummaryById = async (req, res) => {
	try {
		if (req.roles.map((e) => e.name).includes("admin")) {
			const summary = await Summary.findByIdAndDelete(req.params.id);
			if (!summary) return res.status(404).end("Not found");
			return res.status(200).end("Deleted");
		}
		return res.status(401).end("Not authorized");
	} catch (e) {
		console.error(e);
		res.status(500).end();
	}
};

export const getSummaries = async (req, res) => {
	try {
		const summaries = await Summary.find().populate("type");
		return res.send(summaries);
	} catch (e) {
		console.error(e);
		res.status(500).end();
	}
};
