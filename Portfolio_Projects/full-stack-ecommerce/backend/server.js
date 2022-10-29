require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 4000;
const store = new session.MemoryStore();
const Passport = require("passport");
const FacebookStrategy = require("passport-facebook")



app.use(
  session({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: false },
    store: store,
  })
);


Passport.use(new FacebookStrategy({
  clientID:process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  callbackURL:process.env.CALLBACKURL
}, function(accessToken, refreshToken, profile,done){
/*
    db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
      'https://www.facebook.com',
      profile.id
    ], function(err, cred) {
      if (err) { return cb(err); }
      if (!cred) {
        // The Facebook account has not logged in to this app before.  Create a
        // new user record and link it to the Facebook account.
        db.run('INSERT INTO users (name) VALUES (?)', [
          profile.displayName
        ], function(err) {
          if (err) { return cb(err); }

          var id = this.lastID;
          db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
            id,
            'https://www.facebook.com',
            profile.id
          ], function(err) {
            if (err) { return cb(err); }
            var user = {
              id: id.toString(),
              name: profile.displayName
            };
            return cb(null, user);
          });
        });
      } else {
        // The Facebook account has previously logged in to the app.  Get the
        // user record linked to the Facebook account and log the user in.
        db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, user) {
          if (err) { return cb(err); }
          if (!user) { return cb(null, false); }
          return cb(null, user); */
}))


// Importing Router Files.
const userRouter = require("./Routes/users/users");
const cartRouter = require("./Routes/cart/cart");
const authRouter = require("./Routes/auth/auth");
const productsRouter = require("./Routes/products/products");
const ordersRouter = require("./Routes/orders/orders");
const checkoutRouter = require("./Routes/checkout/checkout");

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/order", ordersRouter);
app.use("/checkout", checkoutRouter);
app.listen(PORT, () => {
  console.log(`Ecommerce app listening on port ${PORT}`);
});
