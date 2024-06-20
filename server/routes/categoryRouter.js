const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route("/")
    .get(categoryController.getAll)
    .post(auth, authAdmin, categoryController.createCategory)

router.route("/:id")
    .delete(auth, authAdmin, categoryController.deleteCategory)
    .put(auth, authAdmin, categoryController.updateCategory)

module.exports = router;