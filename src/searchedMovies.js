import React from "react";

const searchedMovies = ({ movies }) => {
	return (
		<div>
			<br />
			<table className="table">
				<tbody>
					{movies.map((movie) => {
						return (
							<tr key={movie.title}>
								<td>Score: %</td>
								<td>{movie.Poster}</td>
								<td>{movie.title}</td>
								<td>{movie.year}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
export default searchedMovies;
