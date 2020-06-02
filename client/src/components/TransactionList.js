import React from "react";
import Transaction from "./Transaction";

export default function TransactionList(props) {
  const { transactions } = props;
  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} {...transaction} />
        ))}
      </ul>
    </>
  );
}
