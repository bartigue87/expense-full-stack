const express = require("express");
const transactionRouter = express.Router();
const Transaction = require("../models/transaction.js");

//Get all
transactionRouter.get("/", (req, res, next) => {
  Transaction.find((err, transactions) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(transactions);
  });
});

//Get tracnsactions by user id
transactionRouter.get("/user", (req, res, next) => {
  Transaction.find({ user: req.user._id }, (err, transactions) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(transactions);
  });
});

// Add new
transactionRouter.post("/", (req, res, next) => {
  req.body.user = req.user._id;
  const newTransaction = new Transaction(req.body);
  newTransaction.save((err, savedTransaction) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedTransaction);
  });
});

//delete
transactionRouter.delete("/:transactionId", (req, res, next) => {
  Transaction.findOneAndDelete(
    { _id: req.params.transactionId, user: req.user._id },
    (err, deletedTransaction) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res
        .status(200)
        .send(`Successfully deleted transaction ${deletedTransaction}`);
    }
  );
});

module.exports = transactionRouter;
