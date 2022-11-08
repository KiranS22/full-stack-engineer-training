const express = require("express");
const stripeRouter = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

//third party login

stripeRouter.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CALLBACKURL}/checkout-success`,
    cancel_url: `${process.env.CALLBACKURL}/cart`,
  });

  res.send({url: session.url});
});

module.exports = stripeRouter;
