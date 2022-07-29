const express = require("express");
const Users = require("../models/model");

const router = express.Router();

router.post("/register", async (req, res) => {
  //   const salt = await bcrypt.genSalt(12);
  const { userName, email, password, confirmPassword } = req.body;
  //   const usr = {
  //     userName: req.body.userName,
  //     email: req.body.email,
  //     confirmPassword: req.body.password,
  //     password: await bcrypt.hash(req.body.password, salt),
  //   };
  const alreadyExistsUser = await Users.findOne({
    where: { email: req.body.email },
  }).catch((err) => {
    console.log("Error:", err);
  });
  if (alreadyExistsUser) {
    return res.json({ message: "user with email already exits!" });
  }

  const newUser = new Users({ userName, email, password, confirmPassword });
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error:", err);
    res.json({ error: "cannont register user at the moment" });
  });
  if (savedUser) res.json({ message: "thanks for registering" });
});

// router.patch("/:id", async (req, res) => {
//   // const salt = await bcrypt.genSalt(12);
//   const usr = {
//     userName: req.body.userName,
//     password: req.body.password,
//   };

//   await Users.update(usr, {
//     where: { id: req.params.id },
//     individualHooks: true,
//   });

//   let users = await Users.findOne({
//     where: { id: req.params.id },
//   });

//   res.json(users);
// });

module.exports = router;
