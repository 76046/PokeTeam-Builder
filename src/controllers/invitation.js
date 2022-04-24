import Invitation from "../schemas/invitation.js";
import User from "../schemas/user.js";
export const postInvitation = (req, res) => {
  return res.status(418).end("Not implemented");
};

export const deleteInvitationById = (req, res) => {
  return res.status(418).end("Not implemented");
};

export const getInvitationsById = (req, res) => {
  return res.status(418).end("Not implemented");
};

export const getAcceptById = async (req, res) => {
  try {
    const invitation = await Invitation.findOne({ _id: req.params.id })
      .populate("requester", { username: 1, email: 1, _id: 1, friends: 1 })
      .populate("requestee", { username: 1, email: 1, _id: 1, friends: 1 });

    if (!invitation) return res.status(404).end("Not found");
    if (invitation._doc.status === "PENDING") {
      let requester = invitation._doc.requester._doc;
      let requestee = invitation._doc.requestee._doc;
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
    }
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
