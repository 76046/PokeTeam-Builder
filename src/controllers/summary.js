import Summary from "../schemas/summary.js";
import User from "../schemas/user.js";
import Team from "../schemas/team.js";
import Decision from "../schemas/decision.js";

export const postSummary = async (req, res) => {
  try {
    if (req.roles.map((e) => e.name).includes("user")) {
      const user = await User.findOne({
        email: req.email,
      });
      let s = req.body;
      let decisions = [];
      for (let d of s.decisions) {
        let decision = await new Decision(d).save();
        decisions.push(decision._doc._id);
      }

      const team = await new Team(s.team).save();
      s.team = team._doc._id;
      s.user = user._doc._id;
      s.decisions = decisions;
      const summary = await Summary(s).save();
      const summ = await Summary.findOne({
        _id: summary._doc._id,
      })
        .populate("facts")
        .populate("decisions");
      if (!summ) return res.status(404).end("Not found");
      const t = await Team.findById(summ._doc.team._id).populate("pokemons");
      let result = summ._doc;
      result.team = t._doc;

      return res.send(result);
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
      })
        .populate("facts")
        .populate("decisions");
      if (!summary) return res.status(404).end("Not found");

      const t = await Team.findById(summary._doc.team._id).populate("pokemons");
      let result = summary._doc;
      result.team = t._doc;

      return res.send(result);
    }
    return res.status(401).end("Not authorized");
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const getSwichPublic = async (req, res) => {
  try {
    if (req.roles.map((e) => e.name).includes("user")) {
      const user = await User.findOne({
        email: req.email,
      });
      const summary = await Summary.findOne({
        user: user._doc._id.toString(),
        _id: req.params.id,
      })
        .populate("facts")
        .populate("decisions");
      if (!summary) return res.status(404).end("Not found");
      await Summary.findByIdAndUpdate(req.params.id, {
        public: !summary._doc.public,
      });
      const s = await Summary.findOne({
        _id: req.params.id,
      })
        .populate("facts")
        .populate("decisions");
      const t = await Team.findById(s._doc.team._id).populate("pokemons");
      let result = s._doc;
      result.team = t._doc;

      return res.send(result);
    }
    return res.status(401).end("Not authorized");
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const patchSummaryById = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.email,
    });
    if (!user) return res.status(404).end("Not found");
    let newName = req.body.name;
    if (!newName) return res.status(400).end("Invalid data");
    await Summary.findOneAndUpdate(
      { user: user._doc._id, _id: req.params.id },
      { name: newName }
    );
    const summary = await Summary.findById(req.params.id);
    if (!summary) return res.status(404).end("Not found");
    return res.send(summary);
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
    if (req.roles.map((e) => e.name).includes("user")) {
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
    const user = await User.findOne({
      email: req.email,
    });
    if (!user) return res.status(404).end("Not found");
    let summaries = await Summary.find({ user: user._doc._id })
      .populate("facts")
      .populate("decisions");

    let result = [];
    for (let s of summaries) {
      const t = await Team.findById(s._doc.team._id).populate("pokemons");
      s._doc.team = t._doc;
      result.push(s._doc);
    }
    return res.send(result);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const getSummariesForUser = async (req, res) => {
  try {
    if (req.roles.map((e) => e.name).includes("user")) {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).end("Not found");
      let summaries = await Summary.find({ user: user._doc._id, public: true })
        .populate("facts")
        .populate("decisions")
        .populate("user");
      let result = [];
      for (let s of summaries) {
        const t = await Team.findById(s._doc.team._id).populate("pokemons");
        s._doc.team = t._doc;
        result.push(s._doc);
      }
      return res.send(result);
    }
    return res.status(401).end("Not authorized");
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};
