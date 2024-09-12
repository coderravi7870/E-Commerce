const userServices = require("../services/userServices");
const validationHepler = require("../helpers/validation");
const app_constants = require("../constants/app.json");

exports.userSignUp = async (req,res)=>{
    try {
        const required_fildes = ["name", "email", "password"];
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

        const response = await userServices.userSignUp(req.body);

        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}

exports.userActivation = async (req,res)=>{
    try {
        const response = await userServices.userActivation(req.body,res);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}

exports.userLogin = async (req,res)=>{
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
        const response = await userServices.userLogin(req.body,res);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}


exports.getUser = async (req,res)=>{
    try {
        
        const response = await userServices.getUser(req.user);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}

exports.logoutUser = async (req,res)=>{
    try {
        
        
        const response = await userServices.logoutUser(res);
       console.log("response",response);
        
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}