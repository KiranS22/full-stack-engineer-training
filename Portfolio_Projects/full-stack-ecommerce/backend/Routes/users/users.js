const express = require("express");
const pool = require("../../db");
const usersRouter = express.Router();

const bcrypt = require("bcryptjs");



//GET SINGLE USER
usersRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const singleUser = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    res.send(singleUser.rows[0]);
  } catch (err) {
    onsole.log("Error:", err.message);
  }
});
//ADD NEW USER
usersRouter.post("/", async (req, res) => {
  
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      phone_number,
      address,
      city,
      postcode,
    } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const allUsers = await pool.query(
      "INSERT INTO users(first_name, last_name, email, password, phone_number, address, city, postcode) VALUES($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *",
      [
        first_name,
        last_name,
        email,
        hash,
        phone_number,
        address,
        city,
        postcode,
      ]
    );
    res.send(allUsers.rows[0]);
  } catch (err) {
    onsole.log("Error:", err.message);
  }
});
usersRouter.put("/:id", async (req, res) => {
  try {
    const { email } = req.body;
    const { id } = req.params;

    "UPDATE  users SET email = $1 WHERE id = $2", [email, id];
    res.send("Information Updated Successfully");
  } catch (err) {
    onsole.log("Error:", err.message);
  }
});
//DELETE USER
usersRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM  users WHERE id = $1", [id]);
    res.send("User deleted Successfully");
  } catch (err) {
    onsole.log("Error:", err.message);
  }
});

module.exports = usersRouter;
