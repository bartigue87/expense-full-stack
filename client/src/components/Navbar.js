import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider.js";

export default function Navbar(props) {
  const { logout } = props;
  const {
    user: { username },
  } = useContext(UserContext);

  return (
    <div className="navbar">
      <h1>Welcome @{username}!</h1>
      <h1 className="logout" onClick={logout}>
        Logout
      </h1>
    </div>
  );
}
