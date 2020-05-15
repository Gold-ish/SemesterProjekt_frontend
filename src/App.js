import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { SearchPage } from "./pages/SearchPage";
import { Login } from "./pages/Login";
import { UserPage } from "./pages/UserPage";
import { Admin } from "./pages/Admin";
import { MoviePage } from "./pages/Moviepage";
import "./styles/App.css";

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const setLoginStatus = (status) => {
		setIsLoggedIn(status);
	};
	const [username, setUsername] = useState();
	const [roles, setRoles] = useState();
	const [searchResult, setSearchResult] = useState("");

	return (
		<Router>
			<div className="App">
				<Header
					loginMsg={isLoggedIn ? "Logout" : "Login"}
					isLoggedIn={isLoggedIn}
					username={username}
					roles={roles}
					setSearchResult={setSearchResult}
				/>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/search">
						<SearchPage searchString={searchResult.toString()} />
					</Route>
					<Route path={`/moviepage/:imdbID`}>
						<MoviePage
							username={username}
						/>
					</Route>
					<Route exact path="/user">
						<UserPage isLoggedIn={isLoggedIn}
							setLoginStatus={setLoginStatus}
							roles={roles} />
					</Route>
					<Route exact path="/admin">
						<Admin isLoggedIn={isLoggedIn}
							setLoginStatus={setLoginStatus} />
					</Route>
					<Route path="/login-out">
						<Login
							loginMsg={isLoggedIn ? "Logout" : "Login"}
							isLoggedIn={isLoggedIn}
							setLoginStatus={setLoginStatus}
							setUsername={setUsername}
							setRoles={setRoles}
						/>
					</Route>
					<Route>
						<NoMatch />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

function NoMatch() {
	return (
		<div>
			<h2>Path does not exist</h2>
		</div>
	);
}
