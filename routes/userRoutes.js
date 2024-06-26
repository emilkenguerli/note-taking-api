const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.get("/", auth, userController.getUsers);
router.patch("/", auth, userController.updateUser);
router.delete("/", auth, userController.deleteUser);

module.exports = router;
