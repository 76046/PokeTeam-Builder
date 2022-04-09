import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
    required: true,
  },
  category: {
    type: String,
    enum: ["SPECIAL", "PHYSICAL", "STATUS", "NONE"],
    required: true,
  },
  pp: Number,
  power: Number,
  accuracy: Number,
  generation: String,
});

const Move = mongoose.model("Move", schema);

export default Move;
