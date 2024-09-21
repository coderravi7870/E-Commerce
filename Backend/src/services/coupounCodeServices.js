const CoupounCode = require("../models/coupounCodeModel");
const app_constants = require("../constants/app.json");


exports.createCoupounCode = async (data) => {
    
  const isCoupounCodeExists = await CoupounCode.find({name: data.name});
 
    
  if (isCoupounCodeExists.length !== 0) {
    return {
      success: 0,
      status_code: app_constants.BAD_REQUEST,
      message: "coupounCode already exist!",
    };
  }

  const result = await CoupounCode.create(data);

  if (result) {
    return {
      success: 1,
      status_code: app_constants.SUCCESS,
      message: "CoupounCode created successfully",
      result,
    };
  }

  return {
    success: 0,
    status_code: app_constants.INTERNAL_SERVER_ERROR,
    message: error.message,
  };
};


exports.getAllCoupon = async (shopId) => {
    // console.log("shopid", shopId);
  
    const result = await CoupounCode.find({ shopId: shopId.id });
    
    
    return {
      success: 1,
      status: app_constants.SUCCESS,
      message: "all coupons found",
      result,
    };
};
  
exports.deleteCoupon = async (shopId) => {

    // const productData = await Product.findById({ _id: shopId.id });
  // productData.images.forEach((imageUrl)=>{
  //   const filename = imageUrl;
  //   const filePath = `uploads/${filename}`;
  //   console.log("product deleted",filePath);
  //   fs.unlink(filePath,(err)=>{
  //     if(err){
  //       console.log(err);
  //     }
  //   });
  // })
    
    const product = await CoupounCode.findByIdAndDelete({ _id: shopId.id });
  
    if (!product) {
      return {
        success: 0,
        status: app_constants.BAD_REQUEST,
        message: "Coupon not found whith this id!",
        result: {},
      };
    }
  
    return {
      success: 1,
      status: app_constants.SUCCESS,
      message: "Coupon deleted successfully!",
      product:{},
    };
};

exports.getCoupon = async (req)=>{
  const couponCode = await CoupounCode.findOne({name: req.params.name});


  return {
    success:1,
    status: app_constants.SUCCESS,
    message: "Find coupon code!",
    couponCode,
  }
}
  