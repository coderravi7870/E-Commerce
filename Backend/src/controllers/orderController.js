const orderService = require("../services/orderService");

exports.orderProcess = async (req,res)=>{
    try {
         
        const response = await orderService.orderProcess(req);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}

exports.getAllOrders = async (req,res)=>{
    try {
         
        const response = await orderService.getAllOrders(req);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}
exports.getAllSellerOrders = async (req,res)=>{
    try {
         
        const response = await orderService.getAllSellerOrders(req);
        return res.json(response)
    } catch (error) {
        return res.json({
            success: 0,
            status_code: app_constants.INTERNAL_SERVER_ERROR,
            message: error.message,
          });
    }
}


