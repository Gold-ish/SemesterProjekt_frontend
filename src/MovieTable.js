import React from "react";
import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";
import star from "./Yellow_star.svg"

const MovieTable = ({ movies }) => {

	function makeTable() {
		const showAvgRating = (movie) => {
			if (movie.avgRating !== -1) {
				return movie.avgRating;
			} else {
				return "TBD";
			}
		};

		return (
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
					{movies.map(movie => {
						return (
							
								<tr key={movie.imdbID}>
									<td>{showAvgRating(movie)}<img src={star} className="ratingStar" alt="star" /></td>
									<td><NavLink to={`/moviepage/${movie.imdbID}`}><img src={movie.Poster} alt={movie.Title} width="200" /></NavLink></td>
									<td><NavLink to={`/moviepage/${movie.imdbID}`}>{movie.Title}</NavLink></td>
									<td>{movie.Year}</td>
								</tr>
						)
					}
					)}
				</tbody>
			</Table>);
	}

	return (
		<div>
			<br />
			{makeTable()}
		</div>
	);
};
export default MovieTable;

