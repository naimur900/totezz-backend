const {queryPayment} = require("../../controller/bkashController/queryPaymentController");
const queryPaymentRouter = require("express").Router();

queryPaymentRouter.post("/queryPayment", queryPayment);

module.exports = { queryPaymentRouter };
