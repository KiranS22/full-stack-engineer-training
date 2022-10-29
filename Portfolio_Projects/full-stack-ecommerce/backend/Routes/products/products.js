const express = require("express");
const productsRouter = express.Router();
const pool = require("../../db");

// /products (GET)
productsRouter.get("/", async (req, res) => {
  console.log("LoggedIN :", req.session.loggedIn);
  // if (req.session.loggedIn) {
  //   console.log(req.session.user);
  // }
  // req.session.loggedIn = true; //Not Working...
  // console.log(req.session.loggedIn);
  req.session.save((err) => {
    console.log("saved");
  });
  //checkout/3
  //fetch all from cart based on user id
  // orders, ordered_products
  //DB Related Code.
  try {
    const allProducts = await pool.query("SELECT * FROM products");

    res.send(allProducts.rows);
  } catch (err) {
    console.log(err);
  }
});
//Add a new product
productsRouter.post("/", async (req, res) => {
  console.log("Products Route hit!");
  const { name, price, category, description } = req.body;
  try {
    const allProducts = await pool.query(
      "INSERT INTO products(name, price, category, description) VALUES($1, $2, $3, $4) RETURNING *",
      [name, price, category, description]
    );
    res.send(allProducts.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

//Get a Single product.
productsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleProduct = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );
    res.send(singleProduct.rows[0]);
  } catch (err) {
    console.log(err);
  }
});
//update single product)
productsRouter.put("/:id", async (req, res) => {
  const { price } = req.body;
  const { id } = req.params;

  try {
    const updatedProduct = await pool.query(
      "UPDATE  products SET price = $1 WHERE id = $2",
      [price, id]
    );
    res.send("prodct Updated Successfully");
  } catch (err) {
    console.log(err);
  }
});
productsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await pool.query(
      "DELETE FROM  products WHERE id = $1",
      [id]
    );
    res.send("product deleted Successfully");
  } catch (err) {
    console.log(err);
  }
});

module.exports = productsRouter;
