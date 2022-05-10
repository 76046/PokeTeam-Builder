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

export const getRuleById = (req, res) => {
  try {
  } catch (err) {
    return res.status(400).end(err.message);
  }
};

export const putRuleById = (req, res) => {
  try {
  } catch (err) {
    return res.status(401).end(err.message);
  }
};

export const deleteRuleById = (req, res) => {
  try {
  } catch (err) {
    return res.status(401).end(err.message);
  }
};

export const getRules = async (req, res) => {
  try {
    const rules = await Rule.find({}).exec();
    res.send(rules);
  } catch (err) {
    return res.status(500).end(err.message);
  }
};
