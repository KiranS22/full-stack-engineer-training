const express = require('express')
const  cartRouter = express.Router()

cartRouter.get("/");
cartRouter.get("/:userid");
cartRouter.post(':userid/:cartItemid')
cartRouter.put("/:userid/:cartItemid");
cartRouter.delete("/:userid/:cartItemid");

module.exports = cartRouter