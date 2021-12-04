import express, { response } from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";

import handleRegister from "./Controllers/register.js";
import handleSignin from "./Controllers/signin.js";
import handleProfileGet from "./Controllers/profile.js";
import handleGame from "./Controllers/game.js";

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("it is working!");
});

//! signin --> POST = success/fail
app.post("/signin", (req, res) => {
  handleSignin(req, res, db, bcrypt);
});

//! register --> POST = user
app.post("/register", (req, res) => {
  handleRegister(req, res, db, bcrypt);
});

//! profile/:userID --> GET = user
app.get("/profile/:id", (req, res) => {
  handleProfileGet(req, res, db);
});

//! game --> PUT --> score
app.put("/game", (req, res) => {
  handleGame(res, req, db);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
