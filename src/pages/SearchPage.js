import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import URLS from "../Settings";
import MovieTable from "../components/MovieTable";
import Pagination from "../components/Pagination";

export function SearchPage({ searchString }) {
  const [movieList, setMovieList] = useState();
  const [totalResult, setTotalResult] = useState(0);
  const [catchError, setCatchError] = useState();
  const [page, setPage] = useState(1);

  function changePage(pageNumber) {
    facade.fetchData(URLS.Search(searchString, pageNumber)).then((data) => {
      setMovieList(data.movieDTOs);
    });
  }

  useEffect(() => {
    facade.fetchData(URLS.Search(searchString, "1")).then(
      (data) => {
        setCatchError("");
        setTotalResult(data.totalResults);
        setMovieList(data.movieDTOs);
      },
      (rejected) => {
        if (rejected.status) {
          rejected.fullError.then((error) => setCatchError(error.message));
        }
      }
    );
    setPage(1);
  }, [searchString]);

  return (
    <div>
      <br />
      <h2>Search Result</h2>
      {catchError !== undefined && <h3 className="errorMsg">{catchError}</h3>}
      {movieList !== undefined && <MovieTable movies={movieList} />}
      {
        <Pagination
          totalItemsCount={totalResult}
          activePage={page}
          setPage={setPage}
          changePage={changePage}
        ></Pagination>
      }
    </div>
  );
}
