const express = require("express");
const authRouter = express.Router();
const pool = require("../../db");
const bcrypt = require("bcryptjs");
const Passport = require("passport");

authRouter.get("/facebookauth", Passport.authenticate("facebook"));
authRouter.get(
  "/facebookAuth/callback",
  Passport.authenticate("facebook", { failureRedirect: "/login" }),
  async (req, res) => {
    res.redirect("/");
  }
);

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await pool.query("SELECT *  FROM users WHERE email= $1", [
      email,
    ]);
    console.log(foundUser.rows[0]);
    //if the length is > 0, Email is found.
    //Check Password
    // else user does not exist

    if (foundUser.rows.length > 0) {
      //email is matched now compare password
      if (await bcrypt.compare(password, foundUser.rows[0].password)) {
        console.log("Comparsion:", email);
        //Saving IN Session
        req.session.loggedIn = true;
        req.session.user = foundUser.rows[0];
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
  } catch (e) {
    console.log("something went wrong", error);
  }
});
authRouter.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, tel, address, city, postcode } =
    req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    const allUsers = await pool.query(
      "INSERT INTO users(first_name, last_name, email, password, phone_number, address, city, postcode) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [firstName, lastName, email, hash, tel, address, city, postcode]
    );
    res.send({ user: allUsers.rows[0], status: "success" });
  } catch (err) {
    console.log(err);
  }
});

authRouter.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("something went wrong", err);
      res.send("something went wrong", err);
    }

    res.send("User has logged out");
  });
});
module.exports = authRouter;
