import Invitation from "../schemas/invitation.js";
import User from "../schemas/user.js";

export const postInvitation = async (req, res) => {
  try {
    if (req.roles.map((e) => e.name).includes("user")) {
      const invitation = await Invitation(req.body).save();
      return res.send(invitation._doc);
    }
    return res.status(401).end("Not authorized");
  } catch (e) {
    if (e && e.code === 11000) {
      return res.status(422).end("Already exists");
    }
    console.error(e);
    res.status(500).end();
  }
};

export const deleteInvitationById = async (req, res) => {
  try {
    if (req.roles.map((e) => e.name).includes("user")) {
      await Invitation.findByIdAndDelete(req.params.id);
      return res.status(200).end("Deleted");
    }
    return res.status(401).end("Not authorized");
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const getInvitationsById = async (req, res) => {
  try {
    if (req.roles.map((e) => e.name).includes("user")) {
      const invitation = await Invitation.findOne({ _id: req.params.id })
        .populate("requester", { username: 1, email: 1, _id: 1, friends: 1 })
        .populate("requestee", { username: 1, email: 1, _id: 1, friends: 1 });
      if (!invitation) return res.status(404).end("Not found");
      return res.send(invitation);
    }
    return res.status(401).end("Not authorized");
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const getAcceptById = async (req, res) => {
  try {
    const receiver = req.email;
    const invitation = await Invitation.findOne({ _id: req.params.id })
      .populate("requester", { username: 1, email: 1, _id: 1, friends: 1 })
      .populate("requestee", { username: 1, email: 1, _id: 1, friends: 1 });

    if (!invitation) return res.status(404).end("Not found");
    if (invitation._doc.status === "PENDING") {
      let requester = invitation._doc.requester._doc;
      let requestee = invitation._doc.requestee._doc;
      if (requestee.email != receiver) {
        return res.status(401).end("Not authorized");
      }
      requester.friends.push(requestee._id);
      requestee.friends.push(requester._id);
      await User.findOneAndUpdate(
        { _id: requester._id },
        { friends: requester.friends }
      );
      await User.findOneAndUpdate(
        { _id: requestee._id },
        { friends: requestee.friends }
      );
      await Invitation.findOneAndUpdate(
        { _id: invitation._doc._id },
        { status: "ACCEPTED" }
      );
      return res.status(200).end();
    }
    return res.status(404).end("Not found");
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

export const getRejectById = async (req, res) => {
  try {
    const receiver = req.email;
    const invitation = await Invitation.findOne({ _id: req.params.id })
      .populate("requester", { username: 1, email: 1, _id: 1, friends: 1 })
      .populate("requestee", { username: 1, email: 1, _id: 1, friends: 1 });

    if (!invitation) return res.status(404).end("Not found");
    if (invitation._doc.status === "PENDING") {
      let requestee = invitation._doc.requestee._doc;
      if (requestee.email != receiver) {
        return res.status(401).end("Not authorized");
      }
      await Invitation.findByIdAndDelete(invitation._doc._id);
      return res.status(200).end();
    }
    return res.status(404).end("Not found");
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
