const express = require('express');
const eventRouter = express.Router();
const multer = require('multer');
const isAuthenticated= require("../middlewares/auth")

const eventController = require("../controllers/eventController")
const upload = multer({ dest: "uploads/" })


// create Event
eventRouter.post("/create-event",upload.array("images"),eventController.createEvent)

// get all Events of a particular shop
eventRouter.get("/get-all-events/:id",eventController.getAllShopEvents);

// get all events
eventRouter.get("/get-all-events",eventController.getAllEvents);
// delete events of a shop
eventRouter.delete("/delete-event/:id",isAuthenticated.isSeller,eventController.deleteEvent);

module.exports = eventRouter;