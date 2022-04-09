import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  public: {
    type: Boolean,
    required: true,
  },
  pokemons: {
    type: Boolean,
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Pokemon",
  },
});

const Team = mongoose.model("Team", schema);

export default Team;
