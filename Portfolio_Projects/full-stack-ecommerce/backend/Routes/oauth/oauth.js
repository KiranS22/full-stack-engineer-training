const express = require("express");
const oauthRouter = express.Router();
oauthRouter.get("/login");
oauthRouter.get("/register");
module.exports = oauthRouter;
