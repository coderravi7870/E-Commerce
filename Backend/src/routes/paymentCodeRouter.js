const express = require('express');
const paymentCodeRouter = express.Router();

const isAuthenticated= require("../middlewares/auth.js")

const paymentController = require("../controllers/paymentController")




// payment process
paymentCodeRouter.post("/process",paymentController.paymentProcess);


paymentCodeRouter.get("/stripeapikey",paymentController.stripeApiKey);





module.exports = paymentCodeRouter;