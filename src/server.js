import express from "express";
import cors from "cors";
import "dotenv/config";

import formatter from "./middleware/format.js";
import connect from "./methods/db.connection.js";

import invitationRoutes from "./routes/invitation.js";
import moveRoutes from "./routes/move.js";
import pokemonRoutes from "./routes/pokemon.js";
import summaryRoutes from "./routes/summary.js";
import teamRoutes from "./routes/team.js";
import userRoutes from "./routes/user.js";

const port = process.env.PORT ?? 3000;

const app = express();

app.use(cors())
app.use(express.json());
app.use(formatter);

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
