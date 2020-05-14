import React, { useState, useMemo } from 'react';
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";
import star from "../styles/pictures/Yellow_star.svg";

export default function MovieTable(props) {
	let history = useHistory()
	const useSortableData = (items, config = null) => {
		const [sortConfig, setSortConfig] = useState(config);

		const sortedItems = useMemo(() => {
			let sortableItems = [...items];
			if (sortConfig !== null) {
				if (sortConfig.key === "Released") {
					sortableItems.sort((a, b) => {
						let da = new Date(a.Released);
						let db = new Date(b.Released);
						if (da.getTime() < db.getTime()) {
							return sortConfig.direction === 'ascending' ? -1 : 1;
						}
						if (da.getTime() > db.getTime()) {
							return sortConfig.direction === 'ascending' ? 1 : -1;
						}
						return 0;
					});
				} else {
					sortableItems.sort((a, b) => {
						if (a[sortConfig.key] < b[sortConfig.key]) {
							return sortConfig.direction === 'ascending' ? -1 : 1;
						}
						if (a[sortConfig.key] > b[sortConfig.key]) {
							return sortConfig.direction === 'ascending' ? 1 : -1;
						}
						return 0;
					});
				}
			}
			return sortableItems;
		}, [items, sortConfig]);

		const requestSort = (key) => {
			let direction = 'ascending';
			if (
				sortConfig &&
				sortConfig.key === key &&
				sortConfig.direction === 'ascending'
			) {
				direction = 'descending';
			}
			setSortConfig({ key, direction });
		};

		return { movies: sortedItems, requestSort, sortConfig };
	};

	const MakeTable = (props) => {


		const { movies, requestSort, sortConfig } = useSortableData(props.movies);

		const getClassNamesFor = (name) => {
			if (!sortConfig) {
				return;
			}
			return sortConfig.key === name ? sortConfig.direction : undefined;
		};


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
							<th><button type="button" onClick={() => requestSort('avgRating')} className={getClassNamesFor('avgRating')}>Rating</button></th>
							<th>Poster</th>
							<th>Title </th>
							<th>Genre</th>
							<th><button type="button" onClick={() => requestSort('Year')} className={getClassNamesFor('Year')}>Year</button></th>
							<th><button type="button" onClick={() => requestSort('Rated')} className={getClassNamesFor('Rated')}>Rated</button></th>
							<th><button type="button" onClick={() => requestSort('Released')} className={getClassNamesFor('Released')}>Released</button></th>
							<th><button type="button" onClick={() => requestSort('Runtime')} className={getClassNamesFor('Runtime')}>Runtime</button></th>
						</tr>
					</thead>
					<tbody>
						{movies.map((movie) => {
							return (
								<tr className="clickable" key={movie.imdbID} onClick={() => history.push("/moviepage/" + movie.imdbID)}>
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
										<div className="movieTableContent">
											<h3><b>{movie.Title}</b></h3>
											{movie.Plot}

										</div>
									</td>
									<td>
										<div className="movieTableContent">{movie.Genre}</div>
									</td>
									<td>
										<div className="movieTableContent">{movie.Year}</div>
									</td>
									<td>
										<div className="movieTableContent">{movie.Rated}</div>
									</td>
									<td>
										<div className="movieTableContent">{movie.Released}</div>
									</td>
									<td>
										<div className="movieTableContent">{movie.Runtime}</div>
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
			<MakeTable movies={props.movies} />
		</div>
	);
}

