import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  types: {
    type: [mongoose.Schema.Types.ObjectId],
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
  sprites: [String],
});

const Pokemon = mongoose.model("Pokemon", schema);

export default Pokemon;
