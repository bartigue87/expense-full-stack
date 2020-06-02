import React, { useState, useEffect } from "react";
import axios from "axios";

export const UserContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function UserProvider(props) {
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    transactions: [],
    errMsg: "",
  };

  const [userState, setUserState] = useState(initState);

  function signup(credentials) {
    axios
      .post("/author/signup", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      .catch((err) => handleAuthErr(err.response.data.errMsg));
  }

  function login(credentials) {
    axios
      .post("author/login", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        // getUserTransaction();
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      // .catch((err) => handleAuthErr(err.response.data.errMsg));
      .catch((err) => err);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserState({
      user: {},
      token: "",
    });
  }

  function handleAuthErr(errMsg) {
    setUserState((prevState) => ({
      ...prevState,
      errMsg,
    }));
  }

  function resetAuthErr() {
    setUserState((prevState) => ({
      ...prevState,
      errMsg: "",
    }));
  }

  function getUserTransaction() {
    userAxios
      .get("api/transaction/user")
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          transactions: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.err));
  }

  function addTransaction(newTransaction) {
    userAxios
      .post("/api/transaction", newTransaction)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          transactions: [...prevState.transactions, res.data],
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        resetAuthErr,
        addTransaction,
        getUserTransaction,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
