import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  alternatives: {
    type: Object,
    ref: "Team",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  facts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Pokemon",
    required: true,
  },
  decisions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Decision",
    required: true,
  },
  spectrum: {
    type: [Object],
  },
});

const Summary = mongoose.model("Summary", schema);

export default Summary;
