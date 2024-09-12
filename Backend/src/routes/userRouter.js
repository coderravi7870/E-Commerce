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


module.exports = userRouter;