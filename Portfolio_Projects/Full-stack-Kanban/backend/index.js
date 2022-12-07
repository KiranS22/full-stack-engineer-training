const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(express.json());
app.set("trust proxy", 1);
const PORT = process.env.PORT || 4000;
require("dotenv").config();
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
