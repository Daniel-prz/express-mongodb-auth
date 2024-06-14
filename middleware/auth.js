"use strict";
const jwt = require("jsonwebtoken");
function auth(req, res, next) {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ Error: "Access Denied - No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

module.exports = auth;
