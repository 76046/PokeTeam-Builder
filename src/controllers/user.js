import User from "../schemas/user.js";
import Role from "../schemas/role.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Invitation from "../schemas/invitation.js";

export const getUserById = (req, res) => {
  return res.status(418).end("Not implemented");
};

export const postUser = async (req, res) => {
  try {
    const tempUsr = req.body;
    if (tempUsr.roles) {
      tempUsr.roles = await Role.find().where("name").in(tempUsr.roles).exec();
    } else {
      tempUsr.roles = await Role.find({ name: "user" }).exec();
    }

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
  } catch (err) {
    console.error(err);
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

export const getUserSummaries = (req, res) => {
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
