require("dotenv").config();
const express = require("express");
const stripeRouter = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const pool = require("../../db");

stripeRouter.post("/checkout", async (req, res) => {
  const { items } = req.body;
  console.log(items);
  let purchasedItems = [];
  try {
    for (let i = 0; i < items.length; i++) {
      console.log("Stripe functionality loop", items[i].id);

      const response = await pool.query(
        "SELECT * FROM products WHERE id = $1 ",
        [items[i].id]
      );
      let db_product = response.rows[0];

      const singleProduct = {
        price_data: {
          currency: "usd",
          product_data: {
            name: db_product.name,
          },
          unit_amount: Number(db_product.price) * 100,
        },
        quantity: items[i].quantity,
      };
      purchasedItems.push(singleProduct);
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: purchasedItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
    res.send({ url: session.url });
  } catch (err) {
    console.log("Error:", err.message);
  }
});

module.exports = stripeRouter;
