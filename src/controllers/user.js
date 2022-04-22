import User from "../schemas/user.js";
import Role from "../schemas/role.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUserById = (req, res) => {
  return res.status(418).end("Not implemented");
};

export const postUser = async (req, res) => {
  try {
    const tempUsr = req.body;
    tempUsr.roles = await Role.find().where("name").in(tempUsr.roles).exec();

    const salt = await bcrypt.genSalt();
    tempUsr.password = await bcrypt.hash(tempUsr.password, salt);

    const payload = {
      username: user.username,
      roles: tempUsr.roles,
    };

    await new User(tempUsr).save();

    const SECRET = process.env.TOKEN_SECRET;
    const token = jwt.sign(payload, SECRET, {
      expiresIn: "1d",
    });

    delete tempUsr.password;
    delete tempUsr.roles;
    delete tempUsr.__v;
    return res.send({
      user: tempUsr,
      token,
    });
  } catch (e) {
    res.status(500).end();
  }
};

export const deleteUserById = (req, res) => {
  if (req.roles.map((e) => e.name).includes("admin")) {
    return res.status(200).end();
  }
  return res.status(418).end("Not implemented");
};

export const patchUserById = (req, res) => {
  return res.status(418).end("Not implemented");
};

export const postUserLogin = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    }).populate("roles");
    if (!user) res.status(401).end("Login");

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkPassword) res.status(401).end("Password");

    const SECRET = process.env.TOKEN_SECRET;

    const payload = {
      username: user.username,
      roles: user.roles,
    };

    const token = jwt.sign(payload, SECRET, {
      expiresIn: "1d",
    });
    let temp = user._doc;

    delete temp.password;
    delete temp.roles;
    delete temp.__v;

    res.send({
      user: temp,
      token,
    });
  } catch (e) {
    res.status(500).end();
  }
};

export const getUserSummaries = (req, res) => {
  return res.status(418).end("Not implemented");
};

export const postUserInvite = (req, res) => {
  return res.status(418).end("Not implemented");
};

export const getUserInvitations = (req, res) => {
  return res.status(418).end("Not implemented");
};

export const getUserFriends = (req, res) => {
  return res.status(418).end("Not implemented");
};

export const postUserAccept = (req, res) => {
  return res.status(418).end("Not implemented");
};

export const getUserStart = (req, res) => {
  return res.status(418).end("Not implemented");
};

export const verifyToken = async (req, res) => {
  try {
    jwt.verify(req.body.token, process.env.TOKEN_SECRET);
    res.json({ valid: true });
  } catch (ex) {
    res.json({ valid: false });
  }
};
