import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  pokemon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pokemon",
    required: true,
  },
  params: {
    type: [Object],
    required: true,
  },
});

const Decision = mongoose.model("Decision", schema);

export default Decision;
