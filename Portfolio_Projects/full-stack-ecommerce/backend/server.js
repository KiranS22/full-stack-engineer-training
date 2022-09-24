const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 4000;

// Importing Router Files.
const userRouter = require("./Routes/users/users");
const cartRouter = require("./Routes/cart/cart");
const oauthRouter = require("./Routes/oauth/oauth");
const productsRouter = require("./Routes/products/products");
const ordersRouter = require("./Routes/orders/orders");

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/users", userRouter);
app.use("/oauth", oauthRouter);
app.use("/order", ordersRouter);

app.listen(PORT, () => {
  console.log(`Ecommerce app listening on port ${PORT}`);
});
