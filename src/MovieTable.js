import React from "react";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";
import star from "./Yellow_star.svg";

export function MovieTable ({ movies }) {
	let history = useHistory();
	function makeTable() {
		const showAvgRating = (movie) => {
			if (movie.avgRating !== -1) {
				return movie.avgRating;
			} else {
				return "TBD";
			}
		};

		return (
			<div className="searchedMovies">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Average Rating</th>
							<th>Poster</th>
							<th>Title </th>
							<th>Year</th>
						</tr>
					</thead>
					<tbody>
						{movies.map((movie) => {
							return (
								<tr className="clickable" key={movie.imdbID} onClick={() => history.push("/moviepage/"+movie.imdbID)}>
									<td>
										<div className="movieTableContent">
											<h2>
												{showAvgRating(movie)}/10
												<img
													src={star}
													className="ratingStarTable"
													alt="star"
												/>
											</h2>
										</div>
									</td>
									<td>
											<div className="moviePoster">
												<img src={movie.Poster} alt={movie.Title} width="200" />
											</div>
									</td>
									<td>
											<div className="movieTableContent">{movie.Title}</div>
									</td>
									<td>
										<div className="movieTableContent">{movie.Year}</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		);
	}

	return (
		<div>
			<br />
			{makeTable()}
		</div>
	);
};
export default MovieTable;
