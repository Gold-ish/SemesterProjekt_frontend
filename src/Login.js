import React, { useState } from "react";
import { Signup } from "./Signup";
import facade from "./apiFacade";

export function Login({
  isLoggedIn,
  loginMsg,
  setLoginStatus,
  setUsername,
  setRoles,
}) {
  const [catchError, setCatchError] = useState();
  const logout = () => {
    facade.logout();
    setLoginStatus(false);
    setUsername();
    setRoles("");
  };
  const login = (user, pass) => {
    facade.login(user, pass, setUsername, setRoles).then(() => {
      setLoginStatus(true);
    },
      (rejected) => {
        if (rejected.status) {
          rejected.fullError.then((error) => setCatchError(error.message));
        }
      }
    );
  };
  return (
    <div>
      {!isLoggedIn ? (
        <LogIn
          login={login}
          loginMsg={loginMsg}
          setLoginStatus={setLoginStatus}
          setUsername={setUsername}
          setRoles={setRoles}
          catchError={catchError}
        />
      ) : (
          <LoggedIn logout={logout} loginMsg={loginMsg} />
        )}
    </div>
  );
}

function LogIn({ login, loginMsg, setLoginStatus, setUsername, setRoles, catchError }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };
  return (
    <div>
      <br />
      <h2>{loginMsg}</h2>
      <form onChange={onChange}>
        <input placeholder="Username" id="username" /> <br />
        <input type="password" placeholder="Password" id="password" /> <br />
        <button onClick={performLogin} style={{ width: 115 }}>
          Login
        </button>
      </form>
      <p>
        Don't have a user?{" "}
        <Signup
          setLoginStatus={setLoginStatus}
          setUsername={setUsername}
          setRoles={setRoles}
        />
      </p>

      {catchError !== undefined && <p className="errorMsg"><b>{catchError}</b></p>}
    </div>
  );
}

function LoggedIn({ loginMsg, logout }) {
  return (
    <div>
      <h2>Logout here:</h2>
      <button onClick={logout}>{loginMsg}</button>
    </div>
  );
}
