require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./elephant");
const session = require("express-session");
const pgSessionStore = require("connect-pg-simple")(session);
const app = express();
const cookie = require("cookie");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
  })
);

app.use(express.json());



const PORT = process.env.PORT || 4000;

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: false, sameSite: false },
    store: new pgSessionStore({
      pool: pool,
      createTableIfMissing: true,
      tableName: "user_sessions",
    }),
  })
);
//Middlewares for passport
app.use(passport.initialize());
app.use(passport.session());

//Serialize User
passport.serializeUser((user, done) => {
  return done(null, user);
});

//Deserialize User
passport.deserializeUser((user, done) => {
  return done(null, user);
});

//Gooogle Strategy Starts
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: process.env.CALLBACKURL,
      scope: ["profile", "openid", "email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      //POSTGRES
      const person = await pool.query(
        "SELECT *  FROM users WHERE provider_id= $1",
        [profile.id]
      );
      let personInfo;

      if (person.rowCount > 0) {
        personInfo = person.rows[0];
      } else {
        const insertedUser = await pool.query(
          "INSERT INTO users( first_name,last_name,email, provider_id, provider) VALUES($1,$2,$3,$4, $5) RETURNING *",
          [
            profile.name.givenName,
            profile.name.familyName,
            profile.emails[0].value,
            profile.id,
            profile.provider,
          ]
        );

        personInfo = insertedUser.rows[0];
      }

      return cb(null, personInfo);
    }
  )
);
//Google Strategy Ends

// Importing Router Files.
const userRouter = require("./Routes/users/users");
const cartRouter = require("./Routes/cart/cart");
const authRouter = require("./Routes/auth/auth");
const productsRouter = require("./Routes/products/products");
const ordersRouter = require("./Routes/orders/orders");
const stripeRouter = require("./Routes/Stripe/Stripe");

app.get("/", (req, res) => {
  console.log("Backend Working");
  res.send({ message: "Hello" });
});

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/orders", ordersRouter);
app.use("/stripe", stripeRouter);

app.listen(PORT, () => {
  console.log(`Ecommerce app listening on port ${PORT}`);
});

module.exports = app;
