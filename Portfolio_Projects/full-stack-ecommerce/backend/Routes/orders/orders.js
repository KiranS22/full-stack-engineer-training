const express = require("express");
const ordersRouter = express.Router();
const pool = require("../../db");
//GET ALLL ORDERS THAT EXIST ON TH SITE ADMIN
// ordersRouter.get("/", async (req, res) => {
//   try {
//     const allOrders = await pool.query("SELECT * FROM orders");

//     res.send(allOrders.rows);
//   } catch (err) {
//     console.log(err);
//   }
// });
//GET ALL ORDERS ON A SPECIFIC USERS ACCOUNT
ordersRouter.get("/my", (req, res) => {
  console.log("Hit");
  res.send("Hello");
});

ordersRouter.get("/", async (req, res) => {
  try {
    console.log("All Orders Route Hit");
    if (req.session.user) {
      const { user } = req.session;
      const AllOrdersFromUser = await pool.query(
        "SELECT * FROM orders WHERE user_id= $1",
        [user.id]
      );
      res.send(AllOrdersFromUser.rows);
    } else {
      res.send({ status: "fail", message: "User is not logged in" });
    }
  } catch (err) {
    console.log(err);
  }
});

//GET A SPECIFIC ORDER ON A SPECIFIC USERS ACCOUNT
ordersRouter.get("/:orderid", async (req, res) => {
  const { orderid } = req.params;

  try {
    console.log("Single order route hit");
    if (req.session.user) {
      const { user } = req.session;
      console.log("userid:", user.id, " and orderID:", orderid);
      const orderProducts = await pool.query(
        "SELECT ordered_products.product_qty AS product_quantity, ordered_products.product_id, ordered_products.product_price, products.name AS product_name,products.price AS  product_price, products.category AS product_category, products.image AS product_image FROM orders INNER JOIN  ordered_products ON orders.id = ordered_products.order_id INNER JOIN products ON ordered_products.product_id = products.id WHERE orders.user_id = $1 AND orders.id=$2",
        [user.id, orderid]
      );
      const orderInfo = await pool.query(
        "SELECT * FROM orders WHERE id=$1 AND user_id = $2",
        [orderid, user.id]
      );

      res.send({ products: orderProducts.rows, order: orderInfo.rows[0] });
    } else {
      console.log("Inside Else");
    }
  } catch (err) {
    console.log(err);
  }
});

//DELETE AN ORDER
ordersRouter.delete("/:orderid", async (req, res) => {
  try {
    const { orderid } = req.params;
    const deletedOrder = await pool.query("DELETE FROM  orders WHERE id = $1", [
      orderid,
    ]);
    res.send("order deleted Successfully");
  } catch (err) {
    console.log(err);
  }
});

module.exports = ordersRouter;
