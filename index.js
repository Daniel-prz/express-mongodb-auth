"use strict";
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./User");
const PORT = process.env.PORT || 3001;

const uri = `mongodb+srv://dan84perez:${process.env.DB_USER_PASSWORD}@cluster0.23zswrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
app.use(cors());
app.use(express.json());

main().catch((error) => console.log(error));

async function main() {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
}

app.post("/register", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(200).json({ msg: "New User Successfully Created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
