const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../../db");
const bcrypt = require("bcryptjs");
authRouter.post("/register", async (req, res) => {
  console.log("inside regester route!");
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      tel,
      address,
      city,
      postcode,
    } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const allUsers = await pool.query(
      "INSERT INTO users(first_name, last_name, email, password, phone_number, address, city, postcode) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [firstName, lastName, email, hash, tel, address, city, postcode]
    );
    res.status(200).send({ user: allUsers.rows[0], status: "success" });
  } catch (err) {
    console.log(err.message);
    res.status(401).send({ status: "error", message: err.message });
  }
});

authRouter.post("/login", async (req, res) => {
  console.log("log in Route hit!");
  try {
    const { email, password } = req.body;
    const foundUser = await pool.query("SELECT *  FROM users WHERE email= $1", [
      email,
    ]);

    console.log("Found:", foundUser.rows[0]);

    if (foundUser.rows.length > 0) {
      const user = foundUser.rows[0];
      //email is matched now compare password
      if (await bcrypt.compare(password, user.password)) {
        let userInfo = {
          email: user.email,
          id: user.id,
        };
        const token = await jwt.sign(userInfo, process.env.SECRET_KEY);
        console.log(token);
        //Send a Success Message Back
        res.status(201).send({ user: user, token: token, status: "success" });
      } else {
        res
          .status(200)
          .send(
            "A user with these credentials dose not exist! Please register"
          );
      }
    } else {
      res.status(200).send("User with that email or password not found");
    }
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});

authRouter.get("/auth-user", (req, res) => {
  try {
    res.send(req.headers);

    // if (req.session.user) {
    //   res.status(201).send({ user: req.session.user, status: "success" });
    // } else {
    //   res.status(403).send({
    //     status: "error",
    //     message: "User is not logged In",
    //   });
    // }
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});

module.exports = authRouter;