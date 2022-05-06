import cors from "cors";
import config from "./src/config.js";
import express from "express";
import knex from "knex";
import { Model } from "objection";
import userRoute from "./src/routes/users.js";

const app = express();

app.use(
  cors({
    origin: process.env.WEB_APP_ORIGIN,
  })
);
const db = knex(config.db);

Model.knex(db);
app.use(cors);
app.use(express.json());

userRoute(app);

app.listen(config.port, () => console.log(`listening on:${config.port}`));

export default app;
