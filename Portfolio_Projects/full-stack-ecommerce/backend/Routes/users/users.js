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
    res.send({ status: "Error", message: err.meesage });
  }
});

//DELETE USER- only to be used if there is an admn paanel. which may be added at a later date
// usersRouter.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await pool.query("DELETE FROM  users WHERE id = $1", [id]);
//     res.send("User deleted Successfully");
//   } catch (err) {
//     res.send({ status: "Error", message: err.meesage });
//   }
// });

module.exports = usersRouter;
