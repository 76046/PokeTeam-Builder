import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 250,
    trim: true,
  },
  roles: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "Role",
    required: false,
  },
  summaries: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Summary",
    default: [],
    required: false,
  },
  friends: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
    required: false,
  },
});

const User = mongoose.model("User", schema);

export default User;
