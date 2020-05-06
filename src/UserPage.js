import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import URLS from "./Settings";

export function UserPage() {
  return (
    <div>
      <br />
      {UserFetch()}
    </div>
  );
}

function UserFetch() {
  const [dataFromServer, setDataFromServer] = useState("Loading...");
  useEffect(() => {
    facade.fetchData(URLS.User()).then((data) => setDataFromServer(data.msg));
  }, []);
  return (
    <div className="outer">
      <UserStats dataFromServer={dataFromServer}></UserStats>
      <UserReviewRating dataFromServer={dataFromServer}></UserReviewRating>
    </div>
  );
}

function UserStats({ dataFromServer }) {
  return (
    <div>
      <h3>{dataFromServer}</h3>
      <table align="center" border="1">
        <tr>
          <th>Gender:</th>
          <td>dataFromServer.gender</td>
        </tr>
        <tr>
          <th>test</th>
          <td>tmp - This needs to be mapped</td>
        </tr>
      </table>
    </div>
  );
}

function UserReviewRating({ dataFromServer }) {
  return (
    <div>
      <br />
      <h3>My reviews and Ratings</h3>
      <table align="center" border="1">
        <thead>
          <tr>
            <th align="left">Movie: </th>
          </tr>
        </thead>
        <tbody>
          {/* dataFromServer */}
          <td>map data review, and rating here.</td>
        </tbody>
      </table>
    </div>
  );
}
