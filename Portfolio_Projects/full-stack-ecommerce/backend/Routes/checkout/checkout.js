const express = require("express");
const checkoutRouter = express.Router();
const pool = require("../../db");
//THIS IS WHERE THE ORDER IS MADE
checkoutRouter.post("/", async (req, res) => {
  try {
    // Move all the items from the cart to the orders table
    const { user } = req.session;

    //Fetching Cart Items
    const usersCart = await pool.query(
      "SELECT * FROM cart WHERE user_id = $1",
      [user.id]
    );

    //Creating An Order
    const newOrder = await pool.query(
      "INSERT INTO  orders (user_id, placed_at) VALUES($1, $2) RETURNING *",
      [user.id, new Date()]
    );
    console.log(newOrder.rows[0]); //Contains Order Data

    //iNSERTING into Ordered_products Table
    //order_id, product_id
    for (let i = 0; i < usersCart.rows.length; i++) {
      const insertedItem = await pool.query(
        "INSERT INTO ordered_products(order_id, product_id) VALUES($1, $2)",
        [newOrder.rows[0].id, usersCart.rows[i].product_id]
      );
    }
    //Empty Cart where user_id matches user.id

    pool.query("DELETE FROM cart WHERE user_id =$1", [user.id]);
    res.send("Order Created Successfully!");
  } catch (err) {
    console.log(err);
  }
});
module.exports = checkoutRouter;
