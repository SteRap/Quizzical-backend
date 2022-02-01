import express from "express";
import bodyParser from "body-parser"; //middleware for getting Body response using Express
import bcrypt from "bcrypt-nodejs"; // module to HASH the password
import cors from "cors"; //enable CORS comunication between two different domains
import knex from "knex"; //Node Package to connect the server to the database.

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

//create a server with Express
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("it is working!");
});

//! signin --> POST = success/fail
//use POST not PUT to avoid eventual middleman to look into the query string
app.post("/signin", (req, res) => {
  handleSignin(req, res, db, bcrypt);
});

//! register --> POST = create new user
app.post("/register", (req, res) => {
  handleRegister(req, res, db, bcrypt);
});

//! profile/:userID --> GET user
app.get("/profile/:id", (req, res) => {
  handleProfileGet(req, res, db);
});

//! game --> PUT --> update score
app.put("/game", (req, res) => {
  handleGame(req, res, db);
});

//monitor server is working
app.listen(process.env.PORT || 5000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
