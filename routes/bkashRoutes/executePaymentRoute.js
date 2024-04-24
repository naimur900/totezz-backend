const executePaymentRouter = require("express").Router()
const {executePayment} = require("../../controller/bkashController/executePaymentController")

executePaymentRouter.post("/executePayment", executePayment);

module.exports = { executePaymentRouter };
