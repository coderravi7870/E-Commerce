const productsServices = require("../services/productsServices");
const validationHepler = require("../helpers/validation");
const app_constants = require("../constants/app.json");



exports.createProduct = async (req,res)=>{
    try {
        // console.log("req.files",req.files);
        // req.body.files = req.files
        
        const response = await productsServices.createProduct(req);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}

exports.getAllShopProducts = async (req,res)=>{
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
        const response = await productsServices.getAllShopProducts(req.params);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}

exports.deleteProduct = async (req,res)=>{
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
        const response = await productsServices.deleteProduct(req.params);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}

exports.getAllProducts = async(req,res)=>{
    try {
        const response = await productsServices.getAllProducts();
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}