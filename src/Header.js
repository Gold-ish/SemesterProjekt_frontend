import React from "react";
import { NavLink } from "react-router-dom";

export function Header({ isLoggedIn, loginMsg, username, roles }) {
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
			<li>
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
