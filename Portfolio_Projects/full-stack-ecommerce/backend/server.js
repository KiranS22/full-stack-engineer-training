require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 4000;
const store = new session.MemoryStore();

process.env.DB_PORT;

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
