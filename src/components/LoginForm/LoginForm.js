import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../images/icon-above-font.png";
import {isLogged} from "../../_utils/auth/authFunctions";
import { userConnected } from "../../_utils/toasts/users";

const LoginForm = ({ onLogin }) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (history && isLogged()) {
      history.push("/");
    }
  }, [history]);

  const sendData = (e) => {
    e.preventDefault();
    console.log(emailValue, passwordValue);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      crossDomain: true,
      
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    };
    console.log(requestOptions);

    fetch("https://groupomania-backend.ew.r.appspot.com/api/auth/login", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          onLogin();
          // Redirect
          history.push("/");
          // Will update Header state
          
          userConnected();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="row mx-auto justify-content-center">
      <div className="card col-11">
        <img className="card-img-top mx-auto col-8" src={logo} alt="logo and name of the company Groupomania" />
        <div className="card-body">
          <h2 className="h5 card-title text-center">Login</h2>
          <form onSubmit={sendData}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={emailValue}
                onChange={(event) => setEmailValue(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={passwordValue}
                onChange={(event) => setPasswordValue(event.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
