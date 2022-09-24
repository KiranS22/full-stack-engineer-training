const express = require("express");
const pool = require("../../db");
const usersRouter = express.Router();
//GET ALL USERS
usersRouter.get("/", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");

    res.send(allUsers.rows);
  } catch (err) {
    console.log(err);
  }
});

//GET SINGLE USER
usersRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    res.send(singleUser.rows[0]);
  } catch (err) {
    console.log(err);
  }
});
//ADD NEW USER
usersRouter.post("/:id", async (req, res) => {
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
  try {
    const allUsers = await pool.query(
      "INSERT INTO users(fisrt_name, last_name, email, password, phone_number. address, city, postcode) VALUES($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *",
      [
        first_name,
        last_name,
        email,
        password,
        phone_number,
        address,
        city,
        postcode,
      ]
    );
    res.send(allUsers.rows[0]);
  } catch (err) {
    console.log(err);
  }
});
usersRouter.put("/:id", async (req, res) => {
  try {
    const { email } = req.body;
    const { id } = req.params;

    "UPDATE  users SET email = $1 WHERE id = $2", [email, id];
    res.send("Information Updated Successfully");
  } catch (err) {
    console.log(err);
  }
});
//DELETE USER
usersRouter.delete('/:id', async (req, res)=>{
  const { id } = req.params;
  try {
    await pool.query(
     "DELETE FROM  users WHERE id = $1",
     [id]
   );
   res.send("User deleted Successfully");
 } catch (err) {
   console.log(err);
 }
})



module.exports = usersRouter;
