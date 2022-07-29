const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const userController = require("./userController");

const router = express.Router();

router.route("/").get(userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getUsers)
  .patch(userController.updateUsers)
  .delete(userController.deleteUsers);
router.use(registerApi);
router.use(loginApi);

module.exports = router;
