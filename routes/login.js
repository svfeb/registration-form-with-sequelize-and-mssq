const express = require("express");
const Users = require("../models/model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/login", async function (req, res) {
  const { email, password } = req.body;

  const userWithEmail = await Users.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error", err);
    }
  );
  if (!userWithEmail) {
    return res.json({ message: "Email or Password does not match.." });
  }

  if (!(await bcrypt.compare(password, userWithEmail.password))) {
    return res.json({ message: "Email or Password does not match..." });
  }

  const jwtToken = jwt.sign(
    {
      id: userWithEmail.id,
      email: userWithEmail.email,
    },
    process.env.JWT_SECRET
  );
  res.json({
    message: "welcome back",
    token: jwtToken,
  });
});

module.exports = router;
