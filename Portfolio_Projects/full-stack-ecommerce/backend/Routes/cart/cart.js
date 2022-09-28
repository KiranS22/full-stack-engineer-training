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
      "SELECT * FROM cart INNER JOIN products ON (cart.product_id = product.id ) WHERE cart.user_id = $1",

      [user.id]
    );
    res.send(usersCart.rows);
  } catch (err) {
    console.log(err);
  }
});
// Add to cart
cartRouter.post("/:productid", async (req, res) => {
  try {
    const { productid } = req.params;
    const { user } = req.session;
    const { product_qty } = req.body;
    const newCart = await pool.query(
      "INSERT INTO  cart (product_id, user_id, product_qty) VALUES($1, $2,$3) RETURNING * ",
      [productid, user.id, product_qty]
    );
    res.send(newCart.rows);
  } catch (err) {
    console.log(err);
  }
});
cartRouter.put("/:userid", async (req, res) => {
  try {
    const { product_qty,product_id } = req.body;
    const { user } = req.session;

    "UPDATE  cart SET product_qty = $1 WHERE product_id = $3 AND user_id = $2"
      [product_qty, user.id, product_id];
    res.send("Cart Updated Successfully");
  } catch (err) {
    console.log(err);
  }
});
cartRouter.delete("/:productid", async (req, res) => {
  const { productid } = req.params;
  const { user } = req.session;
  const deletedCartItem = await pool.query(
    "DELETE FROM cart WHERE product_id = $1 AND user_id = $2",
    [productid, user.id]
  );
  res.send("Delwtw Successful");
});
module.exports = cartRouter;
