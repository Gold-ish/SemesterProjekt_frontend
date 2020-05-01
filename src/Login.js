import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import facade from "./apiFacade";

export function Login({ isLoggedIn, loginMsg, setLoginStatus, setUsername,
	setRoles }) {

	const logout = () => {
		facade.logout();
		setLoginStatus(false);
		setUsername("");
		setRoles("");
	};
	const login = (user, pass) => {
		facade.login(user, pass, setUsername, setRoles).then((res) => {
			setLoginStatus(true);
		});
	};
	return (
		<div>
			{!isLoggedIn ? (
				<LogIn login={login} loginMsg={loginMsg} />
			) : (
					<LoggedIn logout={logout} loginMsg={loginMsg} />
				)}
		</div>
	);
}

function LogIn({ login, loginMsg }) {
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
				<br />
				<p>Don't have a user? <Signup /></p>
			</form>
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

function Signup() {
	const [show, setShow] = useState(false);
	const [isBlocking, setIsBlocking] = useState(false);

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
		handleClose();
	};
	//"username": string,
	//"password": String,
	//"birthday”: date 
	//"gender": String,
	return (
		<>
			<button onClick={handleShow} className="signUpBtn">Sign up</button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Sign up</Modal.Title>
				</Modal.Header>
				<form onSubmit={handleSubmit}>
					<Modal.Body>
						<p></p>
						<input type="text" id="username" name="username" />
						<p></p>
						<input type="password" id="password" name="password" />
						<p></p>
						<input type="password" id="passwordConfirm" name="passwordConfirm" />
						<p>Please select your gender:</p>
						<input type="radio" id="male" name="gender" value="male" />
						<label htmlFor="male">Male</label>
						<input type="radio" id="female" name="gender" value="female" />
						<label htmlFor="female">Female</label>
						<input type="radio" id="other" name="gender" value="other" />
						<label htmlFor="other">Other</label>
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