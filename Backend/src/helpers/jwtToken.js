const app_constants = require("../constants/app.json")
// create token and saving that in cookie
const sendToken = (user,statusCode,res)=>{
   

    const token = user.getJwtToken();
    // console.log("sendToken",token);


    
    
    // options for cookies
    const options = {
        expires: new Date(Date.now() + 90*24*60*60*1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
    };

    res.setHeader('Cache-Control', 'no-store'); // Prevent caching
    res.setHeader('Pragma', 'no-cache');

    res.status(statusCode).cookie("token",token,options).json({
        success: 1,
        status:app_constants.SUCCESS,
        result:user,
        token
    })
};

module.exports = sendToken;


