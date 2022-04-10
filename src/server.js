import express from "express";
const app = express();
const port = 3000;

import invitationRoutes from "./routes/invitation.js";
import moveRoutes from "./routes/move.js";
import pokemonRoutes from "./routes/pokemon.js";
import summaryRoutes from "./routes/summary.js";
import teamRoutes from "./routes/team.js";
import userRoutes from "./routes/user.js";
import connect from "./methods/db.connection.js";
import init from "./methods/db.init.js";
import "dotenv/config";

app.use(express.json());
app.use("/invitation", invitationRoutes);
app.use("/move", moveRoutes);
app.use("/pokemon", pokemonRoutes);
app.use("/summary", summaryRoutes);
app.use("/team", teamRoutes);
app.use("/user", userRoutes);

connect()
  .then(() => {
    console.log("\x1b[42m\x1b[30m%s\x1b[0m", "Database connected");
    app.listen(port, () => {
      console.log(
        "\x1b[44m\x1b[30m%s\x1b[0m",
        `Example app listening on port ${port}`
      );
    });
  })
  .catch(() =>
    console.log("\x1b[42m\x1b[30m%s\x1b[0m", "Database connection failed")
  );
