import React from "react";
import TopTenMovies from "./topTenMovies";
import facade from "./apiFacade";

export function Home({ searchResult }) {
	return (
		<div>
			<p>search: {searchResult}</p>
			<h2>Top 10 movies right now</h2>
			<TopTenMovies />

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
