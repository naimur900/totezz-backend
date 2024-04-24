const {createPayment} = require("../../controller/bkashController/createPaymentController");
const createPaymentRouter = require("express").Router();

createPaymentRouter.post("/createPayment", createPayment);

module.exports = { createPaymentRouter };
