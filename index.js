"use strict";
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const role = require("./middleware/role");
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
    const role = req.body.role;
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    res.status(200).json({ msg: "New User Successfully Created", newUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email }).exec();

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user.id, user }, process.env.SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Login Success!", token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/dashboard", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "Welcome to the dashboard!",
      userInfo: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/admin", auth, role("admin"), (req, res) => {
  res.status(200).json({ message: "Welcome to the admin area!" });
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});

app.delete("/users/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).end();
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
