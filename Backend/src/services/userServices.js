const cloudinary = require("../helpers/cloudnary");
const User = require("../models/userModel");
const app_constants = require("../constants/app.json");
const sendMail = require("../helpers/sendEmail");
const sendToken = require("../helpers/jwtToken");
const jwt = require("jsonwebtoken");
const path = require("path");

exports.userSignUp = async (data) => {
  const { name, email, password } = data;
  const user_data = await User.findOne({ email });

  if (user_data) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "Email already exists",
      result: {},
    };
  }
  //   console.log("Data signing up", data);

  // Store on Cloudinary
  const result = await cloudinary.uploader.upload(data.file.path);

  const user = {
    name: name,
    email: email,
    password: password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  };

  const activationToken = createActivationToken(user);

  const acitvationUrl = `http://localhost:5173/activation/${activationToken}`;

  try {
    await sendMail({
      email: user.email,
      subject: "Activate your account",
      message: `Hello ${user.name}, Please click on the link to activate your account: ${acitvationUrl}`,
    });

    return {
      success: 1,
      message: `Please check your email :- ${user.email} to activate your account`,
    };
  } catch (error) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "Something went wrong...",
      result: {},
    };
  }
};
// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET_KEY, {
    expiresIn: "15m",
  });
};

// activate user
exports.userActivation = async (data, res) => {
  const { activation_token } = data;
  const newUser = jwt.verify(
    activation_token,
    process.env.ACTIVATION_SECRET_KEY
  );
  if (!newUser) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "Invalid activation token",
      result: {},
    };
  }

  const { email, name, password, avatar } = newUser;

  let user = await User.findOne({ email });

  if (user) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "user already exists",
      result: {},
    };
  }

  const response = await User.create({
    name,
    email,
    password,
    avatar,
  });
  if (!response) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "user not created something wrong..",
      result: {},
    };
  }

  return {
    success: 1,
    status: app_constants.SUCCESS,
    message: "user created successfully",
    result: {},
  };
};

exports.userLogin = async (data, res) => {
  const { email, password } = data;
  // console.log("email",email);
  // console.log("password",password);
  let user_data = await User.findOne({ email }).select("+password");

  if (!user_data) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "user does not already exists",
      result: {},
    };
  }
  //   console.log("user_data",user_data);

  const isPassword = await user_data.comparePassword(password);

  if (!isPassword) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "Incorrect password",
    };
  }
  sendToken(user_data, 201, res);
};

exports.getUser = async (data) => {
  const user_data = await User.findById(data.id);

  if (!user_data) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "User doesn't exists",
      result: {},
    };
  }
  return {
    success: 1,
    status: app_constants.SUCCESS,
    message: "user get successful",
    result: user_data,
  };
};

exports.logoutUser = async (res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  return {
    success: 1,
    status: app_constants.SUCCESS,
    message: "Log out successful!",
  };
};

exports.updateUser = async (data) => {
  const { name, email, phoneNumber, password } = data;

  const user_data = await User.findOne({ email }).select("+password");

  if (!user_data) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "user does not already exists",
      result: {},
    };
  }

  const isPassword = await user_data.comparePassword(password);
  console.log("isPassword: " + isPassword);

  if (!isPassword) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "Incorrect password",
    };
  }

  user_data.name = name;
  user_data.password = password;
  user_data.phoneNumber = phoneNumber;

  await user_data.save();

  return {
    success: 1,
    status: app_constants.success,
    message: "Upldated successfully!",
    result: user_data,
  };
};

exports.updateUserAvatar = async (req) => {
  // console.log("data.id", data.id);

  const existingUser = await User.findById(req.user.id);

  // Delete the old image if it exists
  if (existingUser) {
    const imageId = existingUser.avatar.public_id;

    await cloudinary.uploader.destroy(imageId);

    // Upload the new profile picture
    const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
    });

    existingUser.avatar = {
      public_id: uploadResponse.public_id,
      url: uploadResponse.secure_url,
    };
  }

  await existingUser.save();
  return {
    success: 1,
    status: app_constants.success,
    message: "Avatar Upldated successfully!",
    result: existingUser,
  };
};

exports.updateUserAddresses = async (req) => {
  const user = await User.findById(req.user.id);

  const sameTypeAddress = user.addresses.find(
    (address) => address.addressType === req.body.addressType
  );
  if (sameTypeAddress) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: `${req.body.addressType} address already exists`,
      result: {},
    };
  }

  const existsAddress = user.addresses.find(
    (address) => address._id === req.body._id
  );

  if (existsAddress) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: `${req.body.addressType} address already exists`,
      result: {},
    };
  }

  user.addresses.push(req.body);
  await user.save();

  return {
    success: 1,
    status: app_constants.success,
    message: "Avatar Upldated successfully!",
    user,
  };
};

exports.deleteUserAddress = async (req) => {
  const userId = req.user._id;
  const addressId = req.params.id;

  await User.updateOne(
    {
      _id: userId,
    },
    { $pull: { addresses: { _id: addressId } } }
  );

  const user = await User.findById(userId);

  return {
    success: 1,
    status: app_constants.success,
    message: "address deleted successfully!",
    user,
  }
};


exports.updateUserPassword = async (req)=>{
  const user = await User.findById(req.user.id).select("+password");

  const isPassword = await user.comparePassword(req.body.oldPassword);

  if(!isPassword){
    return {
      success:0,
      status:app_constants.BAD_REQUEST,
      message:"Old password is incorrect!",
      result : {}
    }
  }

  if(req.body.newPassword !== req.body.confirmPassword){
    return {
      success:0,
      status:app_constants.BAD_REQUEST,
      message:"Passwor does not math each other!",
      result : {}
    }
  }

  user.password = req.body.newPassword;
  await user.save();

  return {
    success:1,
    status:app_constants.BAD_REQUEST,
    message:"Your password updated successfully!",
    result : {}
  }
}
