const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./Routes/auth/auth");
app.use(express.json());
const PORT = process.env.PORT || 4000;
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
