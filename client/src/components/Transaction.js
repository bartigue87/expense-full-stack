import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";

export default function Transaction(props) {
  const { text, amount, id } = props;

  const sign = amount < 0 ? "-" : "+";

  return (
    <li className={amount < 0 ? "minus" : "plus"}>
      {text}
      <span>
        {sign}${Math.abs(amount)}
      </span>
    </li>
  );
}
