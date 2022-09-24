const express = require("express");
const ordersRouter = express.Router();
const pool = require("../../db");
//GET ALLL ORDERS THAT EXIST ON TH SIGHT
ordersRouter.get("/", async (req, res) => {
  try {
    const allOrders = await pool.query("SELECT * FROM users");

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
//MAKE AN ORDER
ordersRouter.post("/:userid/:orderid", async (req, res) => {
  try {
    const { userid, orderid } = req.params;
  } catch (err) {
    console.log(err);
  }
});
//UPDATE AN ORDER
ordersRouter.put("/:id/userid/:orderid", async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
});

//DELETE AN ORDER
ordersRouter.delete("/:id/userid/:orderid", async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
});

module.exports = ordersRouter;
