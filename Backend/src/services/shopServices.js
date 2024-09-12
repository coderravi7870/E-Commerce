const sendMail = require("../helpers/sendEmail");
const Shop = require("../models/shopModel");
const app_constants = require("../constants/app.json");
const cloudinary = require("../helpers/cloudnary");
const jwt = require("jsonwebtoken");
const sendShopToken = require("../helpers/shopToken");
const Product = require("../models/productModel");

exports.shopSignUp = async (data)=>{
    const {email,name,password,address,zipCode,phoneNumber} = data;
    
    const seller_data = await Shop.findOne({email});

    if(seller_data){
        return {
            success: 0,
            status: app_constants.BAD_REQUEST,
            message: "Email already exists",
            result : {}
        }
    }
     // Store on Cloudinary
     const result = await cloudinary.uploader.upload(data.file.path);

    const seller = {
        name:name,
        email:email,
        password:password,
        avatar:result.secure_url,
        address:address,
        zipCode:zipCode,
        phoneNumber:phoneNumber

    };

    const activationToken = createActivationToken(seller);
    const acitvationUrl = `http://localhost:5173/seller/activation/${activationToken}`;


    try {
        await sendMail({
            email:seller.email,
            subject:"Activate your shop",
            message:`Hello ${seller.name}, Please click on the link to activate your shop: ${acitvationUrl}`
        })

        return {
            success: 1,
            message:`Please check your email :- ${seller.email} to activate your shop`,
        } 
    } catch (error) {
        return {
            success: 0,
            status: app_constants.BAD_REQUEST,
            message: "Something went wrong...",
            result : {}
        }
    }
}

// create activation token
const createActivationToken = (seller)=>{
    return jwt.sign(seller,process.env.ACTIVATION_SECRET_KEY,{
        expiresIn:"5m",
    });
}

// activate seller
exports.shopActivation = async (data,res)=> {
    
    const {activation_token} = data;
    
    const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET_KEY
    );
      if (!newSeller) {
        return {
            success: 0,
            status: app_constants.BAD_REQUEST,
            message: "Invalid activation token",
            result: {}
        }
      }

      const { email, name, password, avatar,zipCode,address,phoneNumber } = newSeller;
   
      let Seller = await Shop.findOne({ email });

      if (Seller) {
         return {
            success: 0,
            status: app_constants.BAD_REQUEST,
            message: "seller already exists",
            result: {} 
        }
      }
      
     
      const  response = await Shop.create({
          name,
          email,
          password,
          address,
          phoneNumber,
          avatar, 
          zipCode,
        });
        
        
        if(!response){
            return {
                success: 0,
                status: app_constants.BAD_REQUEST,
                message: "seller not created something wrong..",
                result: {} 
            }
        }
        
    return {
        success: 1,
        status: app_constants.SUCCESS,
        message:"seller created successfully",
        result: {}
    }

}

exports.loginShop = async (data,res)=> {
    const {email,password} = data;
    // console.log("email",email);
    // console.log("password",password);
      let seller_data = await Shop.findOne({ email }).select("+password");

      if (!seller_data) {
         return {
            success: 0,
            status: app_constants.BAD_REQUEST,
            message: "user does not already exists",
            result: {}
        }
      }
    //   console.log("user_data",user_data);
      
      const isPassword = await seller_data.comparePassword(password);
      
      
      if(!isPassword){
        return {
            success: 0,
            status: app_constants.BAD_REQUEST,
            message:"Incorrect password"
        }
      }
      sendShopToken(seller_data,201,res);
}

exports.getSeller = async (data)=> {
    const user_data = await Shop.findById(data.id);
 
    if(!user_data) {
     return {
         success: 0,
         status: app_constants.BAD_REQUEST,
         message:"Seller doesn't exists",
         result:{}
     }
    }
    return {
     success:1,
     status:app_constants.SUCCESS,
     message:"Seller get successful",
     result:user_data
    }
}

exports.logoutSeller = async (res)=> {
    res.cookie("seller_token",null,{
      expires: new Date(Date.now()),
      httpOnly: true,
    })
  
     return {
      success:1,
      status:app_constants.SUCCESS,
      message:"Seller Logout successful!"
     }
}

exports.getShopInfo = async (shopId)=>{
    const shop = await Shop.findById(shopId.id);
    
    if(!shop){
        return {
            success:0,
            status:app_constants.BAD_REQUEST,
            message:"shop not found!",
            result:{}
        }
    }

    return {
        success:1,
        status:app_constants.SUCCESS,
        message:"shop info successfully get!",
        shop, 
    }
}

