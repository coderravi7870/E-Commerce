const CoupounCode = require("../models/coupounCodeModel");
const app_constants = require("../constants/app.json");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.paymentProcess = async (req) => {
  // console.log(req.body);
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "AUD",
    metadata: {
      company: "Becodemy",
    },
  });
  return {
    success: 1,
    status: app_constants.success,
    message: "Payment Process Success!",
    client_secret: myPayment.client_secret,
  };
};

exports.stripeApiKey = async (req) => {
  return {
    stripeApiKey: process.env.STRIPE_API_KEY,
  };
};
