import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import URLS from "./Settings";

export function Admin() {
	return (
		<div>
			{AdminFetch()}
			{Fetching()}
			{AdminCriticCode()}
		</div>
	);
}

function AdminFetch() {
	const [dataFromServer, setDataFromServer] = useState("Loading...");
	useEffect(() => {
		facade.fetchData(URLS.Admin()).then((data) => setDataFromServer(data.msg));
	}, []);
	return (
		<div>
			<h2>Admin</h2>
			<h3>{dataFromServer}</h3>
		</div>
	);
}

function Fetching() {
	const [dataFromServer, setDataFromServer] = useState("Loading...");
	useEffect(() => {
		facade.fetchData(URLS.AdminData()).then((data) => {
			let returnData = "";
			for (let key in data) {
				returnData += key + ": " + data[key] + " \n";
				console.log(key, data[key]);
			}
			setDataFromServer(returnData);
			console.log(returnData);
		});
	}, []);
	return <p>{dataFromServer}</p>;
}

function ClickHandler() {
	const [criticCode, setCriticCode] = useState("Loading...");

	useEffect(() => {
		facade.fetchData(URLS.CriticCode()).then((data) => {
			setCriticCode(data.code);
			console.log("returnData:   ", data.code);
		});
	}, []);
	console.log("criticcode: ", criticCode);
	return <p>{criticCode}</p>;
}

function AdminCriticCode() {
	return (
		<div>
			<h3>Create speciel critic code</h3>
			<button onClick={ClickHandler()}>Get Critic Code</button>
		</div>
	);
}
