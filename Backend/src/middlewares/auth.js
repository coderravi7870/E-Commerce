const app_constants= require("../constants/app.json");
const jwt = require("jsonwebtoken");
const Shop = require("../models/shopModel");
const User = require("../models/userModel");

exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
   
    if (!token) {
        return res.status(401).json({
            success: 0,
            status_code: app_constants.UNAUTHORIZED,
            message: "No token provided",
            result: {}
        });
    }

    try {
        const decoded = jwt.decode(token);
       
        const user_data = await User.findById(decoded.id);
        if (!user_data) {
            return res.status(401).json({
                success: 0,
                status: app_constants.UNAUTHORIZED,
                message: "User does not exist",
                result: {},
            });
        }

        req.user = user_data;
        next();
    } catch (error) {
        return res.status(401).json({
            success: 0,
            status: app_constants.UNAUTHORIZED,
            message: "Token is invalid or expired",
            result: {},
        });
    }
};


exports.isSeller = async (req, res, next) => {
    const { seller_token } = req.cookies;
   
//    console.log("seller token",seller_token);
   
    if (!seller_token) {
        return res.status(401).json({
            success: 0,
            status_code: app_constants.UNAUTHORIZED,
            message: "No seller_token provided",
            result: {}
        });
    }

    try {
        const decoded = jwt.decode(seller_token);
       
        const user_data = await Shop.findById(decoded.id);
        if (!user_data) {
            return res.status(401).json({
                success: 0,
                status: app_constants.UNAUTHORIZED,
                message: "Seller does not exist",
                result: {},
            });
        }

        req.seller = user_data;
        next();
    } catch (error) {
        return res.status(401).json({
            success: 0,
            status: app_constants.UNAUTHORIZED,
            message: "Seller_Token is invalid or expired",
            result: {},
        });
    }
};
