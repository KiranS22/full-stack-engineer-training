const express = require("express");
const productsRouter = express.Router();
const pool = require("../../db");

// /products (GET)
productsRouter.get("/", async (req, res) => {

  req.session.save((err) => {
    console.log("saved");
  });

  try {
    const allProducts = await pool.query(
      "SELECT * FROM products ORDER BY id DESC "
    );

    res.send(allProducts.rows);
  } catch (err) {
    console.log(err);
  }
});
// '/products'
//Add a new product
productsRouter.post("/", async (req, res) => {
  const { name, price, category, description, imageUrl } = req.body;
  try {
    const allProducts = await pool.query(
      "INSERT INTO products(name, price, category, description, image) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, price, category, description, imageUrl]
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
