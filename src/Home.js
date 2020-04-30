import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import URLS from "./Settings";
import MovieTable from "./MovieTable";

export function Home({ searchResult }) {
  return (
    <div>
      {/* <p>search: {searchResult}</p> */}
      <br />
      {searchResult.length > 0 && FetchSearchData(searchResult)}

      <h2>Top 10 movies right now!</h2>
      {/* 

			<br />
			<p>
				<b>Change them?</b> To login as user or admin, use the following
				usernames and password:
			</p>
			<p>Username: admin, password: test</p>
			<p>Username: user1, password: test</p>
			<p>Username: user2, password: test</p>
			<p>Username: user3, password: test</p> */}
    </div>
  );
}

function FetchSearchData(searchResult) {
  const [dataFromServer, setDataFromServer] = useState("Loading...");
  useEffect(() => {
    facade
      .fetchData(URLS.Search(searchResult, "1"))
      .then((data) => setDataFromServer(data));
  });

  return (
    <React.Fragment>
      {dataFromServer.movieDTOs !== undefined && (
        <MovieTable movies={dataFromServer.movieDTOs} />
      )}
    </React.Fragment>
  );
}
