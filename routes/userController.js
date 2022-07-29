const Users = require("../models/model");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res, next) => {
  const users = await Users.findAll({ attributes: { exclude: ["password"] } });

  res.json(users);
  next();
};

exports.getUsers = async (req, res, next) => {
  const users = await Users.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password"] },
  });
  res.json(users);
  next();
};

// exports.deleteUsers = async (req, res, next) => {
//   const user = await Users.findOne({
//     where: { id: req.params.id },
//   });
//   await user.destroy();
//   res.json({ message: "User deleted" });
//   next();
// };
exports.deleteUsers = (req, res, next) => {
  Users.findByPk(req.params.id)
    .then((users) => {
      return users.destroy();
    })
    // .then(() => {
    //   res.status(200).json("USER DELETED");
    // })
    .catch(next);
  res.status(404).json({
    message: "USER DELETED",
  });
};

exports.updateUsers = async (req, res) => {
  const usr = {
    userName: req.body.userName,
    password: req.body.password,
  };

  await Users.update(usr, {
    where: { id: req.params.id },
    individualHooks: true,
  });

  let users = await Users.findOne({
    where: { id: req.params.id },
  });

  res.json(users);
};
