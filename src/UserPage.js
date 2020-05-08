import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  const [userData, setUserData] = useState("Loading...");

  useEffect(() => {
    facade.fetchData(URLS.User()).then((data) => { setUserData(data); console.log(data); });
  }, []);

  const { username, birthday, gender, reviews } = userData;

  return (
    <div className="outer">
      <UserStats
        username={username}
        birthday={birthday}
        gender={gender}
      />
      <UserReviewRating reviews={reviews} username={username} />
    </div>
  );
}

function UserStats({ username, birthday, gender }) {
  return (
    <div>
      <h3>{username}</h3>
      <table align="center" border="1">
        <thead>
          <tr>
            <th>
              <p>Username:</p>
            </th>
            <td>{username}</td>
          </tr>
          <tr>
            <th>
              <p>Birthday:</p>
            </th>
            <td>{birthday}</td>
          </tr>
          <tr>
            <th>
              <p>Gender:</p>
            </th>
            <td>{gender}</td>
          </tr>
        </thead>
      </table>
      {/* 
      INSERT USER PICTURE OR DEFAULT PIC THING.
      Let them stand side by side with the table info
       */}
    </div>
  );
}

function UserReviewRating({ reviews, username }) {
  return (
    <div className="reviewcontainer">
      {reviews !== undefined && ShowReviews(reviews, username)}
    </div>
  );
}

function ShowReviews(reviewArray, username) {
  let history = useHistory();

  return (
    <>
      <br />
      {reviewArray.length !== 0 ? (
        <div className="flex-container baseline">
          {reviewArray.map((element) => (
            <div className="reviewCard clickable" key={element.id} onClick={() => history.push("/moviepage/" + element.movieID)}>
              <p>
                <b>{username}</b>
              </p>
              <p>{element.review}</p>
            </div>
          ))}
        </div>
      ) : (
          <h5>Search for a movie and leave your first review!</h5>
        )}
    </>
  );
}
