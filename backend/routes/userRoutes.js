const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/user/admin");
const { refreshToken } = require("../controller/refreshToken");

// router.post("/user");
router.get("/users", authMiddleware.authentication, userController.getUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/token", refreshToken);
router.delete("/logout", userController.logoutUser);

module.exports = router;
