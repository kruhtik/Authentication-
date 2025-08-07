const express = require("express");
const ordersRouter = express.Router();
const { orders } = require("../controllers/orders.controller");

ordersRouter.post("/", orders);

module.exports = ordersRouter;
