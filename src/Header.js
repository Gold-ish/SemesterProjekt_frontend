import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export function Header({
	isLoggedIn,
	loginMsg,
	username,
	roles,
	setSearchResult,

}) {
	const [search, setSearch] = useState("");
	let history = useHistory();
	const searchF = (evt) => {
		evt.preventDefault();
		history.push("/search");
		setSearchResult(search);
		setSearch("");
	};

	const onChange = (evt) => {
		evt.preventDefault();
		setSearch(evt.target.value);
	};
	return (
		<ul className="header">
			<li>
				<NavLink exact activeClassName="active" to="/">
					Home
				</NavLink>
			</li>

			{isLoggedIn && (
				<React.Fragment>
					{roles.includes("admin") && (
						<li>
							<NavLink activeClassName="active" to="/admin">
								Super-Secret-Admin-stuff
							</NavLink>
						</li>
					)}
				</React.Fragment>
			)}

			<li className="search">
				<InputGroup className="mb-3 searchform">
					<FormControl
						placeholder="Search movietitle"
						value={search}
						onChange={onChange}
					/>
					<InputGroup.Append>
						<Button onClick={searchF}>
							search
						</Button>
					</InputGroup.Append>
				</InputGroup>
			</li>



			<li className="right">
				<NavLink activeClassName="active" to="/login-out">
					{loginMsg}
				</NavLink>
			</li>

			{isLoggedIn && (
				<React.Fragment>
					{(roles.includes("user") || roles.includes("critic")) && (
						<li className="right">
							<NavLink activeClassName="active" to="/user">
								{username}
							</NavLink>
						</li>
					)}
				</React.Fragment>
			)}

			{isLoggedIn && (
				<li>
					<p>
						User: {username}
						{"  "}
						Role: {roles}
					</p>
				</li>
			)}
		</ul>
	);
}
