const cloudinary = require("../helpers/cloudnary");
const User = require("../models/userModel");
const app_constants = require("../constants/app.json");
const sendMail = require("../helpers/sendEmail");
const sendToken = require("../helpers/jwtToken");
const jwt = require("jsonwebtoken");
const path = require("path");

exports.userSignUp = async (data)=> {
    const {name , email, password} = data;
    const user_data = await User.findOne({email});

    if(user_data){
        return {
            success: 0,
            status: app_constants.BAD_REQUEST,
            message: "Email already exists",
            result : {}
        }
    }
    console.log("Data signing up",data);
    
     // Store on Cloudinary
     const result = await cloudinary.uploader.upload(data.file.path);

    const user = {
        name:name,
        email:email,
        password:password,
        avatar:{
            public_id: result.public_id,
            url: result.secure_url
        }
    };

    const activationToken = createActivationToken(user);

    const acitvationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
        await sendMail({
            email:user.email,
            subject:"Activate your account",
            message:`Hello ${user.name}, Please click on the link to activate your account: ${acitvationUrl}`
        })

        return {
            success: 1,
            message:`Please check your email :- ${user.email} to activate your account`,
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
const createActivationToken = (user)=>{
    return jwt.sign(user,process.env.ACTIVATION_SECRET_KEY,{
        expiresIn:"15m",
    });
}

// activate user
exports.userActivation = async (data,res)=> {
    
    const {activation_token} = data;
    const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET_KEY
    );
      if (!newUser) {
        return {
            success: 0,
            status: app_constants.BAD_REQUEST,
            message: "Invalid activation token",
            result: {}
        }
      }

      const { email, name, password, avatar } = newUser;
   
      let user = await User.findOne({ email });

      if (user) {
         return {
            success: 0,
            status: app_constants.BAD_REQUEST,
            message: "user already exists",
            result: {} 
        }
      }
      
      
      const  response = await User.create({
          name,
          email,
          password,
          avatar, 
        });
        if(!response){
            return {
                success: 0,
                status: app_constants.BAD_REQUEST,
                message: "user not created something wrong..",
                result: {} 
            }
        }
        
    return {
        success: 1,
        status: app_constants.SUCCESS,
        message:"user created successfully",
        result: {}
    }

}

exports.userLogin = async (data,res)=> {
    const {email,password} = data;
    // console.log("email",email);
    // console.log("password",password);
      let user_data = await User.findOne({ email }).select("+password");

      if (!user_data) {
         return {
            success: 0,
            status: app_constants.BAD_REQUEST,
            message: "user does not already exists",
            result: {}
        }
      }
    //   console.log("user_data",user_data);
      
      const isPassword = await user_data.comparePassword(password);
      
      
      if(!isPassword){
        return {
            success: 0,
            status: app_constants.BAD_REQUEST,
            message:"Incorrect password"
        }
      }
      sendToken(user_data,201,res);
}

exports.getUser = async (data)=> {
   const user_data = await User.findById(data.id);

   if(!user_data) {
    return {
        success: 0,
        status: app_constants.BAD_REQUEST,
        message:"User doesn't exists",
        result:{}
    }
   }
   return {
    success:1,
    status:app_constants.SUCCESS,
    message:"user get successful",
    result:user_data
   }
}

exports.logoutUser = async (res)=> {
  res.cookie("token",null,{
    expires: new Date(Date.now()),
    httpOnly: true,
  })

   return {
    success:1,
    status:app_constants.SUCCESS,
    message:"Log out successful!"
   }
}