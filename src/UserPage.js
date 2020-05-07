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

  let destructuredFetchData = {
    username: "testUserName",
    password: "testPassword",
    birthday: "testDate",
    gender: "testGender",
    reviews: [
      {
        id: 8,
        movieID: "ttkj3kd",
        review: "this movie is super good",
        username: "testUserName",
        rating: {
          id: 8,
          movieID: "ttkj3kd",
          rating: 8,
          username: "testUserName",
        },
      },
      {
        id: 26,
        movieID: "tt5de5dp",
        review: "abdc bad review",
        username: "randomusername",
        rating: {
          id: 8,
          movieID: "ttkj3kd",
          rating: 8,
          username: "testUserName",
        },
      },
    ],
  };
  const { username, birthday, gender, reviews } = destructuredFetchData;
  return (
    <div className="outer">
      <UserStats
        dataFromServer={dataFromServer}
        username={username}
        birthday={birthday}
        gender={gender}
      />
      <UserReviewRating dataFromServer={dataFromServer} reviews={reviews} />
    </div>
  );
}

function UserStats(props) {
  return (
    <div>
      <h3>{props.dataFromServer}</h3>
      <table align="center" border="1">
        <thead>
          <tr>
            <th>
              <p>Username:</p>
            </th>
            <td>{props.username}</td>
          </tr>
          <tr>
            <th>
              <p>Birthday:</p>
            </th>
            <td>{props.birthday}</td>
          </tr>
          <tr>
            <th>
              <p>Gender:</p>
            </th>
            <td>{props.gender}</td>
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

function UserReviewRating(props) {
  return (
    <div>
      <br />
      <h3>My reviews and Ratings</h3>
      {props.reviews.map((element) => {
        return (
          <table align="center" border="1" key={props.reviews.indexOf(element)}>
            <thead>
              <tr>
                <th>
                  <p>Potentially the movies name here: {element.movieID}</p>
                  <br />
                  <p>Personal rating: {element.rating.rating}</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>{element.review}</p>
                </td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
}
