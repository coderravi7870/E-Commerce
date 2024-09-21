const express = require('express');
const multer = require('multer');
const userRouter = express.Router();
const userController = require("../controllers/userController")
const isAuthenticated = require("../middlewares/auth");
const upload = multer({ dest: "uploads/" });

userRouter.post("/create-user",upload.single("file"), userController.userSignUp);

userRouter.post("/activation", userController.userActivation);

userRouter.post("/login-user", userController.userLogin);

userRouter.get("/getuser",isAuthenticated.isAuthenticated,userController.getUser);
userRouter.get("/logout",isAuthenticated.isAuthenticated,userController.logoutUser);

// update user profile
userRouter.put("/update-user-info",isAuthenticated.isAuthenticated,userController.updateUser)

//update user avatar
userRouter.put("/update-user-avatar",isAuthenticated.isAuthenticated,upload.single("image"), userController.updateUserAvatar)

// update user addresses 
userRouter.put("/update-user-addresses",isAuthenticated.isAuthenticated, userController.updateUserAddresses )

// delete user address
userRouter.delete("/delete-user-addres/:id",isAuthenticated.isAuthenticated,userController.deleteUserAddress)

// update user password
userRouter.put("/update-user-password", isAuthenticated.isAuthenticated, userController.updateUserPassword)

module.exports = userRouter;