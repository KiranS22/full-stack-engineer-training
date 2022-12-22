const express = require("express");
const taskRouter = express.Router();
const pool = require("../../db");
//Get all tasks
taskRouter.get("/", async (req, res) => {
  try {
<<<<<<< HEAD
    const alltasks = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY  id DESC",
      [req.user.id]
    );
    res.status(200).send(alltasks.rows);

 
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: "error", message: err.message });
  }
});

//Add a new tasks
taskRouter.post("/", async (req, res) => {

  try {
    const { task } = req.body;
    const newTask = await pool.query(
      "INSERT INTO tasks(task_name, user_id) VALUES($1, $2) RETURNING *",
      [task, req.user.id]
    );
    res.status(200).send({ status: "success", task: newTask.rows[0] });


  try {
     const allProducts = await pool.query(
       "INSERT INTO products(name, price, category, description, image) VALUES($1, $2, $3, $4, $5) RETURNING *",
       [name, price, category, description, imageUrl]
    );

    // res.status(200).send({ status: "success", product: allProducts.rows[0] });
>>>>>>> b58dac8e4675c4882175946600d2226360f5a032
  } catch (err) {
    console.log(err);
  }
});

//update single task
taskRouter.put("/:id", async (req, res) => {
  try {
<<<<<<< HEAD
    const { task } = req.body;
    const { id } = req.params;

    const updatetask = await pool.query(
      "UPDATE  tasks SET task_name =$2  status = $2 WHERE id = $2",
      [task, "", id]
=======
    const updatetask = await pool.query(
      "UPDATE  products SET price = $1 WHERE id = $2",
      [price, id]
>>>>>>> b58dac8e4675c4882175946600d2226360f5a032
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
<<<<<<< HEAD
      "DELETE FROM  tasks WHERE id = $1",
=======
      "DELETE FROM  products WHERE id = $1",
>>>>>>> b58dac8e4675c4882175946600d2226360f5a032
      [id]
    );
    res.status(200).send("product deleted Successfully");
  } catch (err) {
    res.status(404), send({ status: "error", message: err.message });
  }
});

module.exports = taskRouter;
