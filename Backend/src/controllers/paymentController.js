const paymentServices = require("../services/paymentServices");
const app_constants = require("../constants/app.json");


exports.paymentProcess = async (req,res)=>{
    try {
         
        const response = await paymentServices.paymentProcess(req);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}


exports.stripeApiKey = async (req,res)=>{
    try {
         
        const response = await paymentServices.stripeApiKey(req);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}