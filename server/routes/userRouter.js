const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/signup", userController.signup);
router.post("/refreshtoken", userController.refreshToken);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/userinfo", auth, userController.getUserInfo);

module.exports = router;