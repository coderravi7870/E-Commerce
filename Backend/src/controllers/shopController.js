const shopServices = require("../services/shopServices");
const validationHepler = require("../helpers/validation");
const app_constants = require("../constants/app.json");


exports.shopSignUp = async (req,res)=>{
    try {
        const required_fildes = ["name", "email", "password","address","phoneNumber","file","zipCode"];
        req.body.file = req.file;
        // validation 
        const validationResult = await validationHepler.validation(required_fildes,req.body);

        if(Object.keys(validationResult).length){
            return res.json({
                success:0,
                status_code: app_constants.BAD_REQUEST,
                message: validationResult
            })
        }

        const valid_email = await validationHepler.validEmail(req.body.email)
        if(!valid_email) {
            return res.json({
                success:0,
                status_code: app_constants.BAD_REQUEST,
                message: "Invalid email",
                result: {}
            })
        }

        const response = await shopServices.shopSignUp(req.body);

        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}


exports.shopActivation = async (req,res)=>{
    try {
        const response = await shopServices.shopActivation(req.body,res);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}

exports.loginShop = async (req,res)=>{
    try {
        const required_fildes = ["email", "password"];
       
        
        // validation 
        const validationResult = await validationHepler.validation(required_fildes,req.body);

        if(Object.keys(validationResult).length){
            return res.json({
                success:0,
                status_code: app_constants.BAD_REQUEST,
                message: validationResult
            })
        }
        const response = await shopServices.loginShop(req.body,res);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}

exports.getSeller = async (req,res)=>{
    try {
        const response = await shopServices.getSeller(req.seller);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}

exports.logoutSeller = async (req,res)=>{
    try {
        const response = await shopServices.logoutSeller(res);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}

exports.getShopInfo = async (req,res)=>{
    try {
        const response = await shopServices.getShopInfo(req.params);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}


