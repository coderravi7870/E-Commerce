const express = require('express');
const productsRouter = express.Router();
const multer = require('multer');
const isAuthenticated = require("../middlewares/auth");
const productsController = require("../controllers/productsController")
const upload = multer({ dest: "uploads/" })


// create product
productsRouter.post("/create-product",upload.array("images"),productsController.createProduct)
// get all products of a particular shop
productsRouter.get("/get-all-products-shop/:id",productsController.getAllProducts);

// delete product of a shop
productsRouter.delete("/delete-shop-product/:id",isAuthenticated.isSeller,productsController.deleteProduct);

module.exports = productsRouter;