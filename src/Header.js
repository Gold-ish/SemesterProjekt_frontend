import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
	const searchF = (evt) => {
		setSearchResult(search);
		evt.preventDefault();
		setSearch("");
	};
	const onChange = (evt) => {
		evt.preventDefault();
		setSearch(evt.target.value);
		console.log(search);
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
					{roles.includes("user") && (
						<li>
							<NavLink activeClassName="active" to="/user">
								Cats & Dogs
							</NavLink>
						</li>
					)}
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
				<InputGroup className="mb-3">
					<FormControl
						placeholder="Search movietitle"
						aria-label="Recipient's username"
						aria-describedby="basic-addon2"
						value={search}
						onChange={onChange}
					/>
					<InputGroup.Append>
						<Button variant="outline-secondary" onClick={searchF}>
							Search
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
