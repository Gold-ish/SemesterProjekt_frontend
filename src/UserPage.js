import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import URLS from "./Settings";

export function UserPage() {
	return (
		<div>
            <br />
            {UserFetch()}
		</div>
	);
}

function UserFetch() {
	const [dataFromServer, setDataFromServer] = useState("Loading...");
	useEffect(() => {
		facade.fetchData(URLS.User()).then((data) => setDataFromServer(data.msg));
	}, []);
	return (
		<div>
			<h2>User</h2>
			<h3>{dataFromServer}</h3>
		</div>
	);
}