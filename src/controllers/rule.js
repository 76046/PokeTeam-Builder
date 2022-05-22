import Rule from "../schemas/rule.js";

export const postRule = async (req, res) => {
  try {
    if (req.roles.map((e) => e.name).includes("admin")) {
      await new Rule(req.body).save().catch((err) => {
        if (err && err.code === 11000) {
          return res.status(422).end("Already exists");
        }
        return res.status(422).end("Something goes wrong");
      });
      return res.status(201).end();
    }
    return res.status(401).end("Not authorized");
  } catch (err) {
    return res.status(400).end(err.message);
  }
};

export const getRuleById = async (req, res) => {
  try {
    const rule = await Rule.findOne({
      _id: req.params.id,
    });
    return res.send(rule);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const patchRuleById = async (req, res) => {
  try {
    if (req.roles.map((e) => e.name).includes("admin")) {
      await Rule.findByIdAndUpdate(req.params.id, req.body);
      const rule = await Rule.findById(req.params.id);
      return res.send(rule);
    }
    return res.status(401).end("Not authorized");
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const deleteRuleById = async (req, res) => {
  try {
    if (req.roles.map((e) => e.name).includes("admin")) {
      await Rule.findByIdAndDelete(req.params.id);
      return res.status(200).end("Deleted");
    }
    return res.status(401).end("Not authorized");
  } catch (err) {
    console.error(e);
    res.status(500).end();
  }
};

export const getRules = async (req, res) => {
  try {
    const rules = await Rule.find({}).exec();
    res.send(rules);
  } catch (err) {
    console.error(e);
    return res.status(500).end();
  }
};
