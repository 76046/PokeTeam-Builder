import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  alternatives: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Team",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  facts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Fact",
    required: true,
  },
  decisions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Decision",
    required: true,
  },
});

const Summary = mongoose.model("Summary", schema);

export default Summary;
