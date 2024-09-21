const coupounCodeServices = require("../services/coupounCodeServices");
const validationHepler = require("../helpers/validation");
const app_constants = require("../constants/app.json");



exports.createCoupounCode = async (req,res)=>{
    try {
        // console.log("req.files",req.files);
        // req.body.files = req.files
        const response = await coupounCodeServices.createCoupounCode(req.body);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}

exports.getAllCoupon = async (req,res)=>{
    try {
        // console.log(req.params);
        
        const required_fildes = ['id'];
        // validation 
        const validationResult = await validationHepler.validation(required_fildes,req.params);

        if(Object.keys(validationResult).length){
            return res.json({
                success:0,
                status_code: app_constants.BAD_REQUEST,
                message: validationResult
            })
        }
        const response = await coupounCodeServices.getAllCoupon(req.params);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}

exports.deleteCoupon = async (req,res)=>{
    try {
        const required_fildes = ['id'];
        // validation 
        const validationResult = await validationHepler.validation(required_fildes,req.params);

        if(Object.keys(validationResult).length){
            return res.json({
                success:0,
                status_code: app_constants.BAD_REQUEST,
                message: validationResult
            })
        }
        const response = await coupounCodeServices.deleteCoupon(req.params);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}


exports.getCoupon = async (req,res)=>{
    try {
         
        const response = await coupounCodeServices.getCoupon(req);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}