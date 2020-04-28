import React from "react";

const searchedMovies = ({ movies }) => {
	return (
		<div>
			<p>
				Replace the tbody section with rows generated from the movies endpoint
			</p>
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
