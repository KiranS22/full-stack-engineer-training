const express = require("express");
const cartRouter = express.Router();
const pool = require("../../db");
cartRouter.get("/", async (req, res) => {
  const allCartItems = await pool.query("SELECT * FROM  cart");
  res.send(allCartItems.rows);
});
cartRouter.get("/:userid", async (req, res) => {
  const { user } = req.session;
  try {
    const usersCart = await pool.query(
      "SELECT * FROM cart WHERE user_id = $1",
      [user.id]
    );
    res.send(usersCart.rows);
  } catch (err) {
    console.log(err);
  }
});
// Add to cart
cartRouter.post("/:productid", async (req, res) => {
  const { productid } = req.params;
  const { user } = req.session;
  try {
    const newCart = await pool.query(
      "INSERT INTO  cart (product_id, user_id) VALUES($1, $2) RETURNING * ",
      [productid, user.id]
    );
    res.send(newCart.rows);
  } catch (err) {
    console.log(err);
  }
});
cartRouter.put("/:userid", async (req, res) => {
  try {
    const { productid } = req.body;
    const { user} = req.session;

    "UPDATE  cart SET product_id = 10 WHERE product_id = $1 AND user_id =$2",
      [productid, user.id];
    res.send("Cart Updated Successfully");
  } catch (err) {
    console.log(err);
  }
});
cartRouter.delete("/:productid", async (req, res) => {
  const { productid } = req.params;
  const {user} = req.session;
  deletedCartItem = await pool.query("DELETE FROM cart WHERE product_id = $1 AND user_id = $2", [productid, user.id])
  res.send('Delwtw Successful')
});
module.exports = cartRouter;
