import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  value: {
    type: Object,
    required: true,
  },
});

const Rule = mongoose.model("Rule", schema);

export default Rule;
