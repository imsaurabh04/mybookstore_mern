const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route("/")
    .get(productController.getAll)
    .post(auth, authAdmin, productController.createProduct)
router.route("/:id")
    .get(productController.getProductById)
    .put(auth, authAdmin, productController.updateProduct)
    .delete(auth, authAdmin, productController.deleteProduct)

module.exports = router;