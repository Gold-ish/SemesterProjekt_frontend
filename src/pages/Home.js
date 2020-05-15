import React, { useState, useEffect } from "react";
import MovieTable from "../components/MovieTable";
import facade from "../apiFacade";
import URLs from "../Settings";

export function Home() {
	const [movieList, setMovieList] = useState();

	useEffect(() => {
		facade
			.fetchData(URLs.TopTenMovies())
			.then((data) => setMovieList(data.movieDTOs));
	}, []);

	return (
		<div>
			<br />
			<h2>Top 10 highest rated movies right now!</h2>
			{movieList !== undefined && <MovieTable movies={movieList} />}
		</div>
	);
}
