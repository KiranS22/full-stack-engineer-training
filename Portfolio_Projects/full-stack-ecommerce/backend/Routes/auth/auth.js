const express = require("express");
const authRouter = express.Router();
const pool = require("../../elephant");
const bcrypt = require("bcryptjs");
const passport = require("passport");

authRouter.post("/login", async (req, res) => {
  console.log("log in Route hit!");
  try {
    const { email, password } = req.body;
    const foundUser = await pool.query("SELECT *  FROM users WHERE email= $1", [
      email,
    ]);

    console.log("Found:", foundUser.rows[0]);

    if (foundUser.rows.length > 0) {
      //email is matched now compare password
      if (await bcrypt.compare(password, foundUser.rows[0].password)) {
        //Saving IN Session
        req.session.loggedIn = true;
        req.session.user = foundUser.rows[0];
        res.send({ userInSession: req.session.user });

        //Send a Success Message Back
        res.send({ user: req.session.user, status: "success" });
      } else {
        res.send(
          "A user with these credentials dose not exist! Please register"
        );
      }
    } else {
      res.send("User with that email or password not found");
    }
  } catch (err) {
    console.log("something went wrong", err);
  }
});
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
    res.send({ user: allUsers.rows[0], status: "success" });
  } catch (err) {
    console.log("Error:", err.message);
  }
});

authRouter.get("/auth-user", (req, res) => {
  //No req.session.user
  try {
    if (req.session.user) {
      res.status(200).send({ user: req.session.user, status: "success" });
    } else {
      res.status(203).send({
        status: "error",
        message: "User is not logged In",
      });
    }
  } catch (err) {
    res.status(404).send({ status: "error", message: err.message });
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    const id = req.sessionID;

    req.session.destroy(async (err) => {
      console.log("Session Destroyed!");

      if (err) {
        console.log("something went wrong", err);
        res.send("something went wrong", err);
      }

      const response = await pool.query(
        "DELETE FROM user_sessions WHERE sid = $1",
        [id]
      );
      res.clearCookie("connect.sid");

      res.send({ status: "success", message: "User has logged out" });
    });
  } catch (err) {
    console.log("Error:", err.message);
    res.send({ status: "Error", message: err.message });
  }
});
authRouter.put("/update-profile", async (req, res) => {
  try {
    const { firstName, lastName, email, tel, address, city, postcode } =
      req.body;

    const response = await pool.query(
      "UPDATE users SET first_name = $1, last_name = $2,  phone_number = $3, address = $4, city=$5, postcode=$6 WHERE email = $7 RETURNING *",
      [firstName, lastName, tel, address, city, postcode, email]
    );

    res.send({
      status: "success",
      message: "Profile Updated Sucessfully",
      user: response.rows[0],
    });
  } catch (err) {
    res.send({ status: "Error", message: err.message });
  }
});

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "openid", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.BASE_URL}/login`,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(`${process.env.CLIENT_URL}`);
    req.session.user = req.user;
  }
);
module.exports = authRouter;
