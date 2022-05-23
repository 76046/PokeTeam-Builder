import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  filename: String,
  docId: mongoose.Schema.Types.ObjectId,
});

const Avatar = mongoose.model("Avatar", schema);

export default Avatar;
