import Team from "../schemas/team.js";
import User from "../schemas/user.js";
import Summary from "../schemas/summary.js";

export const postTeam = async (req, res) => {
  try {
    if (req.roles.map((e) => e.name).includes("user")) {
      const team = await Team(req.body).save();
      return res.send(team._doc);
    }
    return res.status(401).end("Not authorized");
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const getTeamById = async (req, res) => {
  try {
    if (req.roles.map((e) => e.name).includes("user")) {
      const team = await Team.findOne({
        _id: req.params.id,
      }).populate("pokemons");
      if (team._doc.public) return res.send(team);
      else {
        const user = await User.findOne({
          email: req.email,
        });
        if (!user) return res.status(404).end("Not found");
        let summaries = await Summary.find({ user: user._doc._id });
        let teamIds = [];
        summaries.forEach((s) => teamIds.push(s._doc.team.toString()));
        if (teamIds.includes(team._doc._id.toString())) return res.send(team);
      }
    }
    return res.status(401).end("Not authorized");
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const patchTeamById = async (req, res) => {
  try {
    if (req.roles.map((e) => e.name).includes("admin")) {
      await Team.findByIdAndUpdate(req.params.id, req.body);
      const team = await Team.findById(req.params.id).populate("pokemons");
      return res.send(team);
    }
    return res.status(401).end("Not authorized");
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const deleteTeamById = async (req, res) => {
  try {
    if (req.roles.map((e) => e.name).includes("admin")) {
      await Team.findByIdAndDelete(req.params.id);
      return res.status(200).end("Deleted");
    }
    return res.status(401).end("Not authorized");
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const getTeams = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.email,
    });
    if (!user) return res.status(404).end("Not found");
    let summaries = await Summary.find({ user: user._doc._id });
    let teamIds = [];
    summaries.forEach((s) => teamIds.push(s._doc.team.toString()));
    const teams = await Team.find({
      _id: {
        $in: teamIds,
      },
    }).populate("pokemons");
    return res.send(teams);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};
