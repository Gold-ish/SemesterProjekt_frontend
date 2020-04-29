import React from "react";
import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";



const TopTenTable = ({ movies }) => {

	function makeTable() {
		return (
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Score: %</th>
						<th>Poster</th>
						<th>Title </th>
						<th>Year</th>
					</tr>
				</thead>
				<tbody>
					{movies.map(movie => {
						return (
							
								<tr key={movie.imdbID}>
									<td>{"100%"}</td>
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
			{makeTable()}
		</div>
	);
};
export default TopTenTable;

