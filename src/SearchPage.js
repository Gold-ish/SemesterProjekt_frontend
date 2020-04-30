import React, { useState, useEffect, componentDidMount } from "react";
import facade from "./apiFacade";
import URLS from "./Settings";
import MovieTable from "./MovieTable";
import Pagination from "./Pagination";


export function SearchPage({ searchString }) {
	const [movieList, setMovieList] = useState();
	const [totalResult, setTotalResult] = useState(0);
	const[page, setPage] = useState(1);

	function changePage(pageNumber){
		facade.fetchData(URLS.Search(searchString, pageNumber)).then((data) => {
			setMovieList(data.movieDTOs);
		});
	}

	useEffect(() => {
		facade.fetchData(URLS.Search(searchString, "1")).then((data) => {
			setTotalResult(data.totalResults);
			setMovieList(data.movieDTOs);

		});
		setPage(1);
	}, [searchString]);


	return (
		<div>
			<br />
			<h2>Search Result</h2>
			{(movieList !== undefined) && <MovieTable movies={movieList} />}
			{<Pagination totalItemsCount ={totalResult} activePage={page} setPage={setPage} changePage={changePage}></Pagination>}
		</div>
	);
}
