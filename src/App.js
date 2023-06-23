import React from "react";
import "./App.css";
import { useState } from "react";

const ERROR_MSG = {
  username: ["Not enough character", "Only Alphabet"],
  email: "Email is Not valid",
  password: "Minimum 6 Characters",
  conPassword: "is not match with password",
};
const VALID_MSG = "Valid";

const Validation = ({ input }) => {
  let msg = "";
  if (input.value.length < 1) msg = "";
  else if (input.status !== "") msg = `${input.status} ⛔️`;
  else msg = `${VALID_MSG} ✅`;
  return (
    <span className={msg === "" ? "valid_message" : "error_message"}>
      {msg}
    </span>
  );
};

function App() {
  const [username, setUserName] = useState({ value: "", status: "" });
  const [email, setEmail] = useState({ value: "", status: "" });
  const [password, setPassword] = useState({ value: "", status: "" });
  const [conPassword, setConPassword] = useState({ value: "", status: "" });

  const isValid = () => {
    if (
      ![
        username.status,
        email.status,
        password.status,
        conPassword.status,
      ].every((status) => status === "")
    ) {
      return "ERROR";
    }
    if (
      ![username.value, email.value, password.value, conPassword.value].every(
        (value) => value.length > 1
      )
    ) {
      return "NOT_COMPLETE";
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("valid", isValid());
    if (isValid() === true) {
      console.log("🚀 ~ isValid:", "submiting");

      try {
        const response = await fetch(
          "https://www.greatfrontend.com/api/questions/sign-up",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              email,
              password,
              password_confirm: conPassword,
            }),
          }
        );

        const { message } = await response.json();
        alert(message);
      } catch (_) {
        alert("Error submitting form!");
      }
    }
  };

  const onChangeHandler = (inputName, value, e) => {
    let msg = "";
    switch (inputName) {
      case "userName":
        if (value.length < 4) msg = ERROR_MSG.username[0];
        if (!value.match(/^[A-Za-z]*$/)) msg = ERROR_MSG.username[1];
        setUserName({ value: value, status: msg });
        break;
      case "email":
        if (!e.target.checkValidity()) msg = e.target.validationMessage;
        setEmail({ value: value, status: msg });
        break;
      case "password":
        if (value.length < 6) msg = ERROR_MSG.password;
        setPassword({ value: value, status: msg });
        break;
      case "conPassword":
        if (password?.value !== value) msg = ERROR_MSG.conPassword;
        setConPassword({ value: value, status: msg });
        break;
      default:
        break;
    }
  };
  return (
    <div className="App">
      <form onSubmit={submitHandler} className="form">
        <label>
          Username:
          <br />
          <input
            required
            type="text"
            value={username.value}
            onChange={(e) => onChangeHandler("userName", e.target.value)}
          />
          <Validation input={username} />
        </label>
        <label>
          Email:
          <br />
          <input
            type="email"
            value={email.value}
            onChange={(e) => {
              onChangeHandler("email", e.target.value, e);
            }}
          />
          <Validation input={email} />
        </label>
        <label>
          Password:
          <br />
          <input
            type="text"
            value={password.value}
            onChange={(e) => onChangeHandler("password", e.target.value)}
          />
          <Validation input={password} />
        </label>
        <label>
          Confirm Password:
          <br />
          <input
            type="text"
            value={conPassword.value}
            onChange={(e) => onChangeHandler("conPassword", e.target.value)}
          />
          <Validation input={conPassword} />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default App;
