const express = require('express');
const app = express();
const cors = require('cors');
const connectonDatabase = require("./helpers/db");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true ,limit:"50mb"}));



// connect db 
connectonDatabase();

//import rountes

const userRouter = require("./routes/userRouter");
const shopRounter = require("./routes/shopRounter");
const productsRouter = require("./routes/productsRouter");
const eventRouter = require("./routes/eventRouter");
const coupounCodeRouter = require("./routes/coupounCodeRouter");
const paymentCodeRouter = require("./routes/paymentCodeRouter");
const orderRouter = require("./routes/orderRouter");

app.use("/user", userRouter);
app.use("/shop",shopRounter);
app.use("/products",productsRouter)
app.use("/event",eventRouter);
app.use("/coupon",coupounCodeRouter);
app.use("/payment",paymentCodeRouter);
app.use("/order",orderRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,async()=>{
    try {
        // await RTCPeerConnection;
        console.log(`Running on server ${PORT}`);
        
    } catch (error) {
        console.log(error);
    }
})