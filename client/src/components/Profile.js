import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import Balance from "./Balance";
import Expense from "./Expense";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";

export default function Profile() {
  const { transactions, getUserTransaction } = useContext(UserContext);

  return (
    <div className="profile">
      <h1 style={{ margin: "50px", fontSize: "80px" }}>Expense Tracker</h1>
      <div className="container">
        <Balance
          transactions={transactions}
          getUserTransaction={getUserTransaction}
        />
        <Expense transactions={transactions} />
        <TransactionList transactions={transactions} />
        <AddTransaction />
      </div>
    </div>
  );
}
