import mongoose from "mongoose";

const connect = () =>
  mongoose.connect(
   process.env.DB_CONNECTION_STRING,
    {
      useNewUrlParser: true,
    }
  );

export default connect;
