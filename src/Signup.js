import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import facade from "./apiFacade";

export function Signup({ setLoginStatus, setUsername, setRoles }) {
  const [show, setShow] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);
  const [username, setUsernameSignupField] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState();
  const [birthday, setBirthday] = useState();

  const handleClose = () => {
    if (isBlocking) {
      alert("Are you sure you want to close?");
      setIsBlocking(false);
    } else {
      setShow(false);
    }
  };
  const handleShow = (event) => {
    event.preventDefault();
    setShow(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      username !== undefined &&
      password !== undefined &&
      gender !== undefined &&
      birthday !== undefined
    ) {
      // console.log(username);
      // console.log(password);
      // console.log(gender);
      // console.log(birthday);
      handleClose();
      facade
        .registerUser(
          username,
          password,
          gender,
          birthday,
          setUsername,
          setRoles
        )
        .then((res) => {
          console.log(res);
          setLoginStatus(true);
        });
      flushData();
    } else {
      alert("Fill in all the information, please");
      setIsBlocking(true);
    }
  };
  const flushData = () => {
    setUsernameSignupField(undefined);
    setPassword(undefined);
    setGender(undefined);
    setBirthday(undefined);
  };

  return (
    <>
      <button onClick={handleShow} className="signUpBtn">
        Sign up
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <UsernameSelection
              setUsernameSignupField={setUsernameSignupField}
              setIsBlocking={setIsBlocking}
            />

            <PasswordSelection
              setPassword={setPassword}
              setIsBlocking={setIsBlocking}
            />

            <GenderSelection
              setGender={setGender}
              setIsBlocking={setIsBlocking}
            />

            <BirtdaySelection
              setBirthday={setBirthday}
              setIsBlocking={setIsBlocking}
            />
          </Modal.Body>
          <Modal.Footer>
            <input
              type="submit"
              value="Sign Up"
              onClick={() => setIsBlocking(false)}
            />
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

function UsernameSelection({ setUsernameSignupField, setIsBlocking }) {
  return (
    <>
      <p>Choose a username: </p>
      <input
        type="text"
        onChange={(event) => {
          setIsBlocking(event.target.value.length > 0);
          setUsernameSignupField(event.target.value);
        }}
      />
      <br />
      <br />
    </>
  );
}

function PasswordSelection({ setPassword, setIsBlocking }) {
  const [tempPassword, setTempPassword] = useState("");
  const [tempConfirmPassword, setTempConfirmPassword] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const checkPasswordsMatch = () => {
    if (tempPassword === tempConfirmPassword) {
      setPassword(tempConfirmPassword);
      setErrorMsg(undefined);
    } else {
      setErrorMsg("The passwords do not match!");
    }
  };

  return (
    <>
      <p>Choose a password: </p>
      <input
        type="password"
        onChange={(event) => {
          setIsBlocking(event.target.value.length > 0);
          setTempPassword(event.target.value);
        }}
      />
      <br />
      <br />
      <p>Confirm password: </p>
      <input
        type="password"
        onChange={(event) => {
          setIsBlocking(event.target.value.length > 0);
          setTempConfirmPassword(event.target.value);
        }}
        onBlur={() => {
          if (tempPassword.length > 0) {
            checkPasswordsMatch();
          }
        }}
      />
      {errorMsg !== undefined && <p className="errorMsg">{errorMsg}</p>}
      <br />
      <br />
    </>
  );
}

function GenderSelection({ setGender, setIsBlocking }) {
  return (
    <>
      <p>Please select your gender:</p>
      <fieldset
        onChange={(event) => {
          setGender(event.target.value);
          setIsBlocking(true);
        }}
      >
        <input type="radio" id="male" name="gender" value="male" />
        <label htmlFor="male">Male</label>
        <input type="radio" id="female" name="gender" value="female" />
        <label htmlFor="female">Female</label>
        <input type="radio" id="other" name="gender" value="other" />
        <label htmlFor="other">Other</label>
      </fieldset>
      <br />
    </>
  );
}

function BirtdaySelection({ setBirthday, setIsBlocking }) {
  return (
    <>
      <p>Enter date of birth: </p>
      <input
        type="date"
        onChange={(event) => {
          setIsBlocking(true);
          setBirthday(event.target.value);
        }}
      />
    </>
  );
}
