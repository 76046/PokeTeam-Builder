import User from "../schemas/user.js";
import Role from "../schemas/role.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Invitation from "../schemas/invitation.js";

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    })
      .populate("roles")
      .populate("friends", { username: 1, email: 1, _id: 1 });
    if (user) return res.send(user);
    else return res.status(404).end("Not found");
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const postUser = async (req, res) => {
  try {
    const tempUsr = req.body;
    if (!tempUsr || Object.keys(tempUsr).length === 0)
      return res.status(400).end("Invalid data");
    if (tempUsr.roles) {
      tempUsr.roles = await Role.find().where("name").in(tempUsr.roles).exec();
    } else {
      tempUsr.roles = await Role.find({ name: "user" }).exec();
    }

    if (!tempUsr.password || !tempUsr.email)
      return res.status(400).end("Incomplete data");

    const salt = await bcrypt.genSalt();
    tempUsr.password = await bcrypt.hash(tempUsr.password, salt);

    const payload = {
      email: tempUsr.email,
      roles: tempUsr.roles,
    };

    const saved = await new User(tempUsr).save().catch((err) => {
      if (err && err.code === 11000) {
        return res.status(422).end("Already exists");
      }
      return res.status(422).end("Something goes wrong");
    });

    if (saved._doc) {
      let data = saved._doc;
      const SECRET = process.env.TOKEN_SECRET;
      const token = jwt.sign(payload, SECRET, {
        expiresIn: "1d",
      });
      data.roles = tempUsr.roles.map((e) => e._doc.name);
      delete data.summaries;
      delete data.password;
      delete data.friends;
      delete data.__v;
      return res.send({
        user: data,
        token,
      });
    }
  } catch (e) {
    if (e.name == "ValidationError") {
      return res.status(422).end("ValidationError");
    }
    console.error(e);
    res.status(500).end();
  }
};

export const deleteUserById = async (req, res) => {
  try {
    if (req.roles.map((e) => e.name).includes("admin")) {
      const deleteUser = await User.findByIdAndDelete(req.params.id);
      if (!deleteUser) return res.status(404).end("Not found");
      return res.status(200).end("Deleted");
    }
    return res.status(401).end("Not authorized");
  } catch (err) {
    console.error(e);
    res.status(500).end();
  }
};

export const patchUser = async (req, res) => {
  try {
    if (!Object.keys(req.body).length > 0) {
      return res.status(400).end("Invalid data");
    }

    await User.findOneAndUpdate({ email: req.email }, req.body);
    const user = await User.findOne({
      email: Object.keys(req.body).includes("email")
        ? req.body.email
        : req.email,
    })
      .populate("roles")
      .populate("friends", { username: 1, email: 1, _id: 1 });
    if (!user) return res.status(404).end("Not found");

    if (
      Object.keys(req.body).includes("email") ||
      Object.keys(req.body).includes("roles")
    ) {
      const payload = {
        email: user.email,
        roles: user.roles,
      };
      const SECRET = process.env.TOKEN_SECRET;
      const token = jwt.sign(payload, SECRET, {
        expiresIn: "1d",
      });
      if (!token) return res.status(400).end("Cannot create new token");
      return res.send({ user: user, token: token });
    }

    return res.send({ user: user });
  } catch (e) {
    if (err && err.code === 11000) {
      return res.status(422).end("Already exists");
    }
    if (e.name == "ValidationError") {
      return res.status(422).end("ValidationError");
    }
    console.error(e);
    res.status(500).end();
  }
};

export const postUserLogin = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    })
      .populate("roles")
      .populate("friends", { username: 1, email: 1, _id: 1 });
    if (!user) res.status(401).end("Login");

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkPassword) res.status(401).end("Password");

    const SECRET = process.env.TOKEN_SECRET;

    const payload = {
      email: user.email,
      roles: user.roles,
    };

    const token = jwt.sign(payload, SECRET, {
      expiresIn: "1d",
    });
    let temp = user._doc;
    temp.roles = temp.roles.map((e) => e.name);
    delete temp.summaries;
    delete temp.password;
    delete temp.__v;

    res.send({
      user: temp,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

export const getUserSummaries = async (req, res) => {
  return res.status(418).end("Not implemented");
};

export const postUserInvite = async (req, res) => {
  try {
    const requester = await User.findOne({
      email: req.email,
    });
    if (!requester) return res.status(404).end("Requester not found");
    const requestee = await User.findOne({
      email: req.body.receiver,
    });
    if (!requestee) return res.status(404).end("Requestee not found");
    if (requester._doc._id.toString() === requestee._doc._id.toString())
      return res.status(400).end("You are requestee");
    if (
      requester._doc.friends.includes(requestee._doc._id) &&
      requestee._doc.friends.includes(requester._doc._id)
    ) {
      return res.status(400).end("Already a friend");
    }

    const invitation = {
      requester: requester._doc._id,
      requestee: requestee._doc._id,
      status: "PENDING",
    };

    const savedInvitation = await new Invitation(invitation).save();
    res.send({
      id: savedInvitation._id,
    });
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(404).end("Invitation already exists");
    }
    console.error(err);
    res.status(500).end();
  }
};

export const getUserInvitations = async (req, res) => {
  try {
    let response = {};
    const user = await User.findOne({
      email: req.email,
    });
    const invitations = await Invitation.find({})
      .populate("requester", { username: 1, email: 1, _id: 1 })
      .populate("requestee", { username: 1, email: 1, _id: 1 });

    const requester = invitations
      .filter(
        (i) => i._doc.requester._doc._id.toString() === user._id.toString()
      )
      .map((i) => i._doc);

    for (let i = 0; i < requester.length; i++) {
      delete requester[i].requester;
    }

    const requestee = invitations
      .filter(
        (i) => i._doc.requestee._doc._id.toString() === user._id.toString()
      )
      .map((i) => i._doc);
    for (let i = 0; i < requestee.length; i++) {
      delete requestee[i].requestee;
    }

    if (requestee) response.received = requestee;
    if (requester) response.sent = requester;
    res.send(response);
  } catch (err) {
    return res.status(500).end();
  }
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
    res.json({
      valid: true,
    });
  } catch (ex) {
    res.json({
      valid: false,
    });
  }
};
