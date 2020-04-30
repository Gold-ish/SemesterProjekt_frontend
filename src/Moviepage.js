import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import URLs from "./Settings";
import {useParams} from "react-router-dom";

export function MoviePage() {
	let { imdbID } = useParams();
	const [movie, setMovie] = useState("Loading...");

	useEffect(() => {
		facade.fetchData(URLs.SpecificMovie(imdbID)).then((data) => {
			setMovie(data);
			console.log(data);
		});
	}, []);

	return (
		<div>
			<br />
			<h3>{movie.Title}</h3>
			<div className="container">
				<div className="movieinfo">Year: {movie.Year}</div>
				<div className="movieposter">
					<img src={movie.Poster} alt={movie.Title}></img>
				</div>
			</div>
			<div className="moviescore">90%</div>
			<div className="movieplot">"movie.plot"</div>
			<div className="moviepictures">More picturs</div>
			<div className="reviewcontainer">
				<div className="review">Review 1 - Skal laves fleksibelt med map</div>
				<div className="review">Review 2 - Skal laves fleksibelt med map</div>
				<div className="review">Review 3 - Skal laves fleksibelt med map</div>
				<div className="review">Review 4 - Skal laves fleksibelt med map</div>
			</div>

		</div>
	);
}
