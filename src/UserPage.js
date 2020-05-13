import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { EditUser } from "./EditUser";
import Button from "react-bootstrap/Button";
import facade from "./apiFacade";
import URLS from "./Settings";
import star from "./Yellow_star.svg";

export function UserPage({ isLoggedIn, setLoginStatus, roles }) {
  return (
    <div>
      <br />
      {UserFetch({ isLoggedIn, setLoginStatus, roles })}
    </div>
  );
}

function UserFetch({ isLoggedIn, setLoginStatus, roles }) {
  const [userData, setUserData] = useState("Loading...");

  useEffect(() => {
    facade.fetchData(URLS.User()).then((data) => setUserData(data));
  }, []);

  const { username, birthday, gender, reviews, ratings } = userData;

  return (
    <div className="outer">
      <UserStats
        username={username}
        birthday={birthday}
        gender={gender}
        roles={roles}
        setUserData={setUserData}
        isLoggedIn={isLoggedIn}
        setLoginStatus={setLoginStatus}
      />
      <UserReviewRating reviews={reviews} ratings={ratings} />
    </div>
  );
}

function UserStats({
  username,
  birthday,
  gender,
  roles,
  setUserData,
  isLoggedIn,
  setLoginStatus,
}) {
  const [catchError, setCatchError] = useState();
  let history = useHistory();
  const deleteUser = () => {
    alert("Are you sure you would like to delete this user?");
    facade.deleteUser(username, gender, birthday).then(
      () => {
        setLoginStatus(!isLoggedIn);
        history.push("/login-out");
      },
      (rejected) => {
        if (rejected.status) {
          rejected.fullError.then((error) => setCatchError(error.message));
        }
      }
    );
  };

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
          <tr>
            <th>
              <p>Roles:</p>
            </th>
            <td>{roles}</td>
          </tr>
        </thead>
      </table>
      <EditUser
        username={username}
        gender={gender}
        birthday={birthday}
        setUserData={setUserData}
      />
      <Button onClick={deleteUser}>Delete user</Button>
      {catchError !== undefined && (
        <p className="errorMsg">
          <b>{catchError}</b>
        </p>
      )}
      {/* 
      INSERT USER PICTURE OR DEFAULT PIC THING.
      Let them stand side by side with the table info
       */}
    </div>
  );
}

function UserReviewRating({ reviews, ratings }) {
  return (
    <>
      <div className="reviewcontainer">
        {reviews !== undefined && ShowReviews(reviews, ratings)}
      </div>
    </>
  );
}

function ShowReviews(reviewArray, ratingArray) {
  let history = useHistory();
  const getRating = (movieId) => {
    return ratingArray.find((x) => x.movieID === movieId).rating;
  };

  return (
    <>
      <br />
      {reviewArray.length !== 0 ? (
        <div className="flex-container baseline">
          {reviewArray.map((element) => (
            <div
              className="reviewCard clickable"
              key={element.id}
              onClick={() => history.push("/moviepage/" + element.movieID)}
            >
              <h5>{FetchMovie(element.movieID)}</h5>
              <p>
                {getRating(element.movieID)}/10
                <img src={star} className="ratingStarTable" alt="star" />
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

function FetchMovie(movieId) {
  const [movieTitle, setMovieTitle] = useState();

  useEffect(() => {
    let shouldFetch = true;
    facade.fetchData(URLS.SpecificMovie(movieId)).then((movie) => {
      if (shouldFetch) {
        setMovieTitle(movie.Title);
      }
    });
    return () => (shouldFetch = false);
  }, [movieId]);

  return movieTitle;
}
