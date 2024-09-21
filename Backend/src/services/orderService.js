const app_constants = require("../constants/app.json");
const Order = require("../models/order");
const Product = require("../models/productModel");

exports.orderProcess = async (req) => {
    // console.log("re.body.order",req.body);
    
  const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

  // group cart items by shopId use hash map
  const shopItemsMap = new Map();

  for (const item of cart) {
    const shopId = item.shopId;
    if (!shopItemsMap.has(shopId)) {
      shopItemsMap.set(shopId, []);
    }
    shopItemsMap.get(shopId).push(item);
  }

  // create an order for each shop
  const orders = [];

  for (const [shopId, items] of shopItemsMap) {
    const order = await Order.create({
      cart: items,
      shippingAddress,
      user,
      totalPrice,
      paymentInfo,
    });
    orders.push(order);
  }

  return {
    success: 1,
    status: app_constants.success,
    message: "Payment Process Success!",
    orders,
  };
};


exports.getAllOrders = async (req) => {

  // console.log(req.params);
  
   
  const orders = await Order.find({"user._id":req.params.userId}).sort({createdAt:-1});

  if(orders.length <= 0){
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "There is no order!",
      result:{}
    }
  }
  return {
    success: 1,
    status: app_constants.success,
    message: "All orders found!",
    orders,
  };
};


exports.getAllSellerOrders = async (req) => {

  //  console.log(req.params);
   
  const orders = await Order.find({"cart.shopId":req.params.shopId}).sort({createdAt:-1});

  if(orders.length <= 0){
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "There is no order!",
      result:{}
    }
  }
  return {
    success: 1,
    status: app_constants.success,
    message: "All orders found!",
    orders,
  };
};
