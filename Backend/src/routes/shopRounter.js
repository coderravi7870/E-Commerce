const express = require('express');
const shopRounter = express.Router();


const multer = require('multer');

const shopController = require("../controllers/shopController")
const isAuthenticated = require("../middlewares/auth");
const upload = multer({ dest: "uploads/" })


shopRounter.post("/create-shop",upload.single("file"),shopController.shopSignUp)

shopRounter.post("/activation",shopController.shopActivation)

shopRounter.post("/login-shop",shopController.loginShop)

shopRounter.get("/getseller",isAuthenticated.isSeller,shopController.getSeller)

// shop logout
shopRounter.get("/logout",isAuthenticated.isSeller,shopController.logoutSeller);

// get shop info
shopRounter.get("/get-shop-info/:id",shopController.getShopInfo);



module.exports = shopRounter;