const express = require("express");
const cartRouter = express.Router();
const pool = require("../../db");
// cartRouter.get("/", async (req, res) => {
//   const allCartItems = await pool.query("SELECT * FROM  cart");
//   res.send(allCartItems.rows);
// });
cartRouter.get("/", async (req, res) => {
  if (req.session.user) {
    console.log("If Running");
    const { user } = req.session;
    try {
      console.log("Fetching Cart Items");
      const usersCart = await pool.query(
        "SELECT * FROM cart INNER JOIN products ON cart.product_id = products.id WHERE cart.user_id = $1",
        [user.id]
      );
      res.send(usersCart.rows);
      // res.send([]);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Else Runnning");
    res.send([]);
  }
});
// Add to cart
cartRouter.post("/:productid", async (req, res) => {
  try {
    if (req.session.user) {
      const { user } = req.session;
      const { productid } = req.params;
      const { product_qty, product_price } = req.body;
      console.log("Product ID:", productid, " product Qty:", product_qty);

      //Check if this user has already added the product
      const existingProducts = await pool.query(
        "SELECT * from cart WHERE product_id =$1 AND user_id =$2",
        [productid, user.id]
      );
      if (existingProducts.rowCount > 0) {
        const foundProduct = existingProducts.rows[0];
        const foundProductQty = foundProduct.product_qty;
        const updatedQty = Number(foundProductQty) + 1;
        //Update quantity of foundProduct
        const updatedProduct = await pool.query(
          "UPDATE  cart SET product_qty = $1 WHERE product_id = $2 AND user_id = $3",
          [updatedQty, productid, user.id]
        );
        res.send({ status: "success", message: "Product added successfully" });
      } else {
        const newCart = await pool.query(
          "INSERT INTO  cart (product_id, user_id, product_qty, product_price) VALUES($1, $2,$3, $4) RETURNING * ",
          [productid, user.id, product_qty, product_price]
        );
        res.send({ status: "success", message: "Product added successfully" });
      }
    } else {
      // 403 - Forbidden Response
      res
        .status(403)
        .send({ status: "error", message: "User is not loggedIn!" });
    }
  } catch (err) {
    console.log(err);
  }
});
// cartRouter.put("/:userid", async (req, res) => {
//   try {
//     const { product_qty, product_id } = req.body;
//     const { user } = req.session;

//   const updatedProduct = await pool.  ("UPDATE  cart SET product_qty = $1 WHERE product_id = $3 AND user_id = $2"[
//       product_qty, user.id, product_id
//     ]);
//     res.send("Cart Updated Successfully");
//   } catch (err) {
//     console.log(err);
//   }
// });
cartRouter.delete("/:productid", async (req, res) => {
  console.log("Route hit - delete singlle product");
  try {
    const { productid } = req.params;
    if (req.session.user) {
      console.log("Single product if is running");
      const { user } = req.session;
      const deletedCartItem = await pool.query(
        "DELETE FROM cart WHERE product_id = $1 AND user_id = $2",
        [productid, user.id]
      );
      res.send({ status: "success", message: "Item deleted successfully!" });
    }
  } catch (err) {
    console.log("Error", err.message);
  }
});
//clear the whole cart from the database
cartRouter.delete("/", async (req, res) => {
  try {
    console.log("Delete hit");
    if (req.session.user) {
      console.log("Inside if");
      const { user } = req.session;
      await pool.query("DELETE FROM cart WHERE user_id =$1", [user.id]);
      res.send({
        status: "success",
        message: "cart has been cleared successfully",
      });
    }
  } catch (err) {
    console.log("Error".err.message);
  }
});
module.exports = cartRouter;
