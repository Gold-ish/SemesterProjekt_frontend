import React, { useState, useEffect } from "react";
import TopTenMovies from "./topTenMovies";
import facade from "./apiFacade";
import URLS from "./Settings";


export function Home({ searchResult }) {

	return (
		<div>
			<p>search: {searchResult}</p>
			{(searchResult.length > 0) && (FecthSearchData())}

			<h2>Top 10 movies right now!</h2>


			<br />
			<p>
				<b>Change them?</b> To login as user or admin, use the following
				usernames and password:
			</p>
			<p>Username: admin, password: test</p>
			<p>Username: user1, password: test</p>
			<p>Username: user2, password: test</p>
			<p>Username: user3, password: test</p>
		</div>
	);
}

function FecthSearchData() {
	const [dataFromServer, setDataFromServer] = useState("Loading...");
	useEffect(() => {
		facade.fetchData(URLS.Search("star", "1")).then((data) => setDataFromServer(data));
	}, []);

	return (
		<React.Fragment>
			{(dataFromServer.movieDTOs !== undefined) && <TopTenMovies movies={dataFromServer.movieDTOs} />}
		</React.Fragment>

	);
}
