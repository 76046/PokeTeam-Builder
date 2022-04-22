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
  min_level: {
    type: Number,
    required: true,
  },
  basic_stats: {
    type: [Number],
    required: true,
  },
  moves: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Move",
    required: true,
  },
});

const Pokemon = mongoose.model("Pokemon", schema);

export default Pokemon;
