const {refundTransaction} = require("../../controller/bkashController/refundTransactionController");
const refundTransactionRouter = require("express").Router();

refundTransactionRouter.post("/refundTransaction", refundTransaction);

module.exports = { refundTransactionRouter };
