const Shop = require("../models/shopModel");
const app_constants = require("../constants/app.json");
const cloudinary = require("../helpers/cloudnary");
const Product = require("../models/productModel");

exports.createProduct = async (req) => {
  console.log("rma ram ");
  
  // Log the req.body properly
  // console.log("req.body:", JSON.stringify(req.body, null, 2));
  
  const shopId = req.body.shopId;
  const shop = await Shop.findById(shopId);

  if (!shop) {
    return {
      success: 0,
      status_code: 400,
      message: "Shop does not exist",
    };
  }

  const files = req.files;

  try {
    // Upload each file to Cloudinary
    const uploadPromises = files.map(file => {
      return cloudinary.uploader.upload(file.path, {
        folder: 'Products' // Uploading to a folder named 'Products'
      });
    });

    // Wait for all uploads to complete
    const uploadResults = await Promise.all(uploadPromises);
    
    // Extract URLs from the upload results
    const imageUrls = uploadResults.map(result => result.secure_url);
    console.log("imageUrls", imageUrls);
    

    // Create product data
    const productData = {
      ...req.body,
      images: imageUrls,
      shop: shop,
    };

    // Save product in the database
    const result = await Product.create(productData);

    return {
      success: 1,
      status_code: 200,
      message: "Product created successfully",
      result,
    };
  } catch (error) {
    console.error('Error uploading files:', error);
    return {
      success: 0,
      status_code: 500,
      message: error.message,
    };
  }
};

exports.getAllProducts = async (shopId) => {
  // console.log("shopid", shopId);

  const result = await Product.find({ shopId: shopId.id });

  return {
    success: 1,
    status: app_constants.SUCCESS,
    message: "all products found",
    result,
  };
};

exports.deleteProduct = async (shopId) => {
  
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

  // console.log("product deleted");
  const product = await Product.findByIdAndDelete({ _id: shopId.id });
  // console.log("product deleted",product);
  
  if (!product) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "product not found whith this id!",
      result: {},
    };
  }

  return {
    success: 1,
    status: app_constants.SUCCESS,
    message: "Product deleted successfully!",
    result:{},
  };
};
