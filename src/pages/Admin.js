import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import URLS from "../Settings";

export function Admin({ isLoggedIn, setLoginStatus }) {
	return (
		<div>
			<br />
			{AdminFetch({ isLoggedIn, setLoginStatus })}
			{AdminCriticCode()}
		</div>
	);
}

function AdminFetch({ isLoggedIn, setLoginStatus }) {
	const [dataFromServer, setDataFromServer] = useState("Loading...");

	useEffect(() => {
		facade.fetchData(URLS.Admin()).then((data) => {
			setDataFromServer(data.msg);
			setLoginStatus(isLoggedIn);
		});
	}, [setLoginStatus, isLoggedIn]);

	return (
		<div>
			<h2>Admin</h2>
			<h3>{dataFromServer}</h3>
		</div>
	);
}

function AdminCriticCode() {
	const [criticCode, setCriticCode] = useState();

	const clickhandler = () => {
		facade.fetchData(URLS.CriticCode()).then((data) => {
			setCriticCode(data.code);
		});
	};

	return (
		<div>
			<h3>Create speciel critic code</h3>
			<button onClick={clickhandler}>Get Critic Code</button>
			<p>{criticCode}</p>
		</div>
	);
}
