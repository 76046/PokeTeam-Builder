import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  pokemon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pokemon",
    required: true,
  },
  rules: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Rule",
    required: true,
  },
});

const Decision = mongoose.model("Decision", schema);

export default Decision;
