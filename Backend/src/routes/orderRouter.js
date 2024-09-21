const express = require('express');
const orderRouter = express.Router();

const isAuthenticated= require("../middlewares/auth.js")

const orderController = require("../controllers/orderController")




// create new order
orderRouter.post("/create-order", orderController.orderProcess);

// get all orders of user
orderRouter.get("/get-all-orders/:userId", orderController.getAllOrders);

// get all orders of seller
orderRouter.get("/get-seller-all-orders/:shopId",orderController.getAllSellerOrders);






module.exports = orderRouter;