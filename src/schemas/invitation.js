import mongoose from "mongoose";

const schema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["ACCEPTED", "REJECTED", "PENDING"],
    required: true,
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  requestee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
schema.index({ requestee: 1, requester: 1 }, { unique: true });

const Invitation = mongoose.model("Invitation", schema);

export default Invitation;
