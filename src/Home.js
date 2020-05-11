import React, { useState, useEffect } from "react";
import MovieTable from "./MovieTable";

export function Home() {
	const [movieList, setMovieList] = useState();

	useEffect(() => {
		//fetch kald her!
		setMovieList(undefined);
	}, [])

	return (
		<div>
			<br />
			<h2>Top 10 highest rated movies right now!</h2>
			{movieList !== undefined && <MovieTable movies={movieList} />}
		</div>
	);
}
