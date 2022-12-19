const express = require("express");
const taskRouter = express.Router();
const pool = require("../../db");
//Get all tasks
taskRouter.get("/", async (req, res) => {
  try {
  //   const allProducts = await pool.query("SELECT * FROM products");
  //   res.status(200).send(allProducts.rows);
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: "error", message: err.message });
  }
});

//Add a new tasks
taskRouter.post("/", async (req, res) => {
  // const { name, price, category, description, imageUrl } = req.body;
  try {
     const allProducts = await pool.query(
       "INSERT INTO products(name, price, category, description, image) VALUES($1, $2, $3, $4, $5) RETURNING *",
       [name, price, category, description, imageUrl]
    );

    // res.status(200).send({ status: "success", product: allProducts.rows[0] });
  } catch (err) {
    console.log(err);
  }
});

//update single task
taskRouter.put("/:id", async (req, res) => {
  try {
    const updatetask = await pool.query(
      "UPDATE  products SET price = $1 WHERE id = $2",
      [price, id]
    );
    res.status(200).send("prodct Updated Successfully");
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});

// Delete a single task from database
taskRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await pool.query(
      "DELETE FROM  products WHERE id = $1",
      [id]
    );
    res.status(200).send("product deleted Successfully");
  } catch (err) {
    res.status(404), send({ status: "error", message: err.message });
  }
});

module.exports = taskRouter;
