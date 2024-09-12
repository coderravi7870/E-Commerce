const express = require('express');
const coupounCodeRouter = express.Router();

const isAuthenticated= require("../middlewares/auth")

const coupounCodeController = require("../controllers/coupounCodeController")



// create coupoun code
coupounCodeRouter.post("/create-coupon-code",isAuthenticated.isSeller,coupounCodeController.createCoupounCode)

// // get all coupon of a  shop
coupounCodeRouter.get("/get-coupon/:id",isAuthenticated.isSeller,coupounCodeController.getAllCoupon);

// delete coupoun code of a shop
coupounCodeRouter.delete("/delete-coupon/:id",isAuthenticated.isSeller,coupounCodeController.deleteCoupon);

module.exports = coupounCodeRouter;