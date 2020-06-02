import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";

const initInputs = {
  text: "",
  amount: "",
};

export default function AddTransaction() {
  const [inputs, setInputs] = useState(initInputs);

  const { addTransaction } = useContext(UserContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addTransaction(inputs);
    setInputs(initInputs);
  }
  const { text, amount } = inputs;
  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="text">Title</label>
          <input
            type="text"
            name="text"
            value={text}
            onChange={handleChange}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <label className="label">
            * Use a negative number for expense and a positive number for income
          </label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={handleChange}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
}
