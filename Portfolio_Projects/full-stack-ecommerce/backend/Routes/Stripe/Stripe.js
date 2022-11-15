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
      success_url:
        "http://localhost:4000/stripe/order/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
    res.send({ url: session.url });
  } catch (err) {
    console.log("Error:", err.message);
  }
});
stripeRouter.get("/order/success", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const { customer_details } = session;
  console.log("stripe session", session.id);
  console.log("stripe customer", customer_details);

  //Create an Order
  //Move the items from cart to Ordered_products
  try {
    if (req.session.user) {
      //   // Move all the items from the cart to the orders table
      const { user } = req.session;
      // //   //Fetching Cart Items
      const usersCart = await pool.query(
        "SELECT * FROM cart WHERE user_id = $1",
        [user.id]
      );
      console.log("Uers' cart data", usersCart.rows[0]);
      //user_id, stripe_session, due_amount, shipping_address, contact, email,
      //   //Creating An Order
      let amount_total = session.amount_total / 100;
      const newOrder = await pool.query(
        "INSERT INTO  orders (user_id, placed_at, stripe_payment_id,amount_due, email) VALUES($1, $2, $3, $4, $5) RETURNING *",
        [user.id, new Date(), session.id, amount_total, user.email]
      );
      console.log(newOrder.rows[0]); //Contains Order Data
      // iNSERTING into Ordered_products Table
      //order_id, product_id

      for (let i = 0; i < usersCart.rows.length; i++) {
        const insertedItem = await pool.query(
          "INSERT INTO ordered_products(order_id, product_id, product_qty,product_price) VALUES($1, $2, $3, $4)",
          [
            newOrder.rows[0].id,
            usersCart.rows[i].product_id,
            usersCart.rows[i].product_qty,
            usersCart.rows[i].product_price,
          ]
        );
      }
      //   //Empty Cart where user_id matches user.id
      pool.query("DELETE FROM cart WHERE user_id =$1", [user.id]);
      res.redirect(`${process.env.CLIENT_URL}/checkout-success`)
    }
  } catch (err) {
    console.log(err);
  }

  // res.send("Your order has been made successfully!");
});
module.exports = stripeRouter;
