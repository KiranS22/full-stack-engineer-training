const express = require("express");
const ordersRouter = express.Router();
const pool = require("../../db");
//GET ALLL ORDERS THAT EXIST ON TH SITE ADMIN
ordersRouter.get("/", async (req, res) => {
  try {
    const allOrders = await pool.query("SELECT * FROM orders");

    res.send(allOrders.rows);
  } catch (err) {
    console.log(err);
  }
});
//GET ALL ORDERS ON A SPECIFIC USERS ACCOUNT
ordersRouter.get("/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    const AllOrdersFromUser = await pool.query(
      "SELECT * FROM orders WHERE user_id= $1",
      [userid]
    );
    res.send(AllOrdersFromUser.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

//GET A SPECIFIC ORDER ON A SPECIFIC USERS ACCOUNT
ordersRouter.get("/:userid/:orderid", async (req, res) => {
  const { userid, orderid } = req.params;
  try {
    const singleUserOrder = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1 AND id=$2",
      [userid, orderid]
    );

    res.send(singleUserOrder.rows[0]);
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
