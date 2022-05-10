import Team from "../schemas/team.js";

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
      return res.send(team);
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
    const teams = await Team.find().populate("pokemons");
    return res.send(teams);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};
