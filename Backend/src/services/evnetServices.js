const Shop = require("../models/shopModel");
const app_constants = require("../constants/app.json");
const cloudinary = require("../helpers/cloudnary");
const Event = require("../models/eventModel");

exports.createEvent = async (req) => {
  const shopId = req.body.shopId;
  const shop = await Shop.findById(shopId);

  if (!shop) {
    return {
      success: 0,
      status_code: app_constants.BAD_REQUEST,
      message: "Shop does not exist",
    };
  }

  const files = req.files;
  const imagesUrls = files.map((file) => `${file.filename}`);
  // console.log("imagesUrls" , imagesUrls);
  const eventData = req.body;
  eventData.images = imagesUrls;
  eventData.shop = shop;

  const result = await Event.create(eventData);

  if (result) {
    return {
      success: 1,
      status_code: app_constants.SUCCESS,
      message: "Event created successfully",
      result,
    };
  }

  return {
    success: 0,
    status_code: app_constants.INTERNAL_SERVER_ERROR,
    message: error.message,
  };
};


exports.getAllShopEvents = async (shopId) => {
    // console.log("shopid", shopId);
  
    const result = await Event.find({ shopId: shopId.id });
    
    
    return {
      success: 1,
      status: app_constants.SUCCESS,
      message: "all Events of a shop found",
      result,
    };
};

exports.getAllEvents = async () => {
    // console.log("shopid", shopId);
  
    const result = await Event.find();
    return {
      success: 1,
      status: app_constants.SUCCESS,
      message: "all Events found",
      result,
    };
};
  
exports.deleteEvent = async (shopId) => {

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
    

    const product = await Event.findByIdAndDelete({ _id: shopId.id });
  
    if (!product) {
      return {
        success: 0,
        status: app_constants.BAD_REQUEST,
        message: "Event not found whith this id!",
        result: {},
      };
    }
  
    return {
      success: 1,
      status: app_constants.SUCCESS,
      message: "Event deleted successfully!",
      product:{},
    };
  };
  