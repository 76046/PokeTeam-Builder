import mongoose from "mongoose";

const connect = () =>
  mongoose.connect(
    "mongodb+srv://adaptive-system:studies123@studies.zlfym.mongodb.net/pt-builder?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );

export default connect;
