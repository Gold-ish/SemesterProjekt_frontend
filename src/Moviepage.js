import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import facade from "./apiFacade";
import URLs from "./Settings";
import star from "./Yellow_star.svg";

export function MoviePage() {
  let { imdbID } = useParams();
  const [movie, setMovie] = useState("Loading...");

  useEffect(() => {
    facade.fetchData(URLs.SpecificMovie(imdbID)).then((data) => {
      setMovie(data);
    });
  }, []);

  const showAvgRating = (movie) => {
    if (movie.avgRating !== -1) {
      return movie.avgRating;
    } else {
      return "TBD";
    }
  };

  //Lav det som et table
  // const reviewMap = movie.review.map(function (a) {
  //   return <li key={a.id}>{a.review}</li>;
  // });

  return (
    <div>
      <br />
      <h3>{movie.Title}</h3>
      <div className="container">
        <div className="movieinfo">Year: {movie.Year}</div>
        <div className="movieRated">Rated: {movie.Rated}</div>
        <div className="movieReleased">Released: {movie.Released}</div>
        <div className="movieRuntime">Runtime: {movie.Runtime}</div>
        <div className="movieGenre">Genre: {movie.Genre}</div>
        <div className="movieDirector">Director: {movie.Director}</div>
        <div className="movieActors">Actors: {movie.Actors}</div>
        <div className="movieLanguage">Language: {movie.Language}</div>
        <div className="movieAwards">Awards: {movie.Awards}</div>
        <div className="movieType">Type: {movie.Type}</div>
        <div className="movieDVD">DVD release: {movie.DVD}</div>
        <div className="movieProduction">Production: {movie.Production}</div>
        <div className="movieposter">
          <img src={movie.Poster} alt={movie.Title}></img>
        </div>
      </div>
      <br />
      <div className="moviescore">
        <h5>
          Average rating: {showAvgRating(movie)}
          <img src={star} className="ratingStar" alt="star" />
        </h5>
      </div>
      <div className="movieplot">{movie.Plot}</div>
      <div className="moviepictures">More pictures</div>
      <div className="reviewcontainer">
        <RatingReviewModal imdbID={imdbID} />
        {console.log(movie.review)}
        <div className="review">Review 1 - Skal laves fleksibelt med map</div>
        <div className="review">Review 2 - Skal laves fleksibelt med map</div>
        <div className="review">Review 3 - Skal laves fleksibelt med map</div>
        <div className="review">Review 4 - Skal laves fleksibelt med map</div>
      </div>
    </div>
  );
}

function RatingReviewModal({ imdbID }) {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState();
  const [isBlocking, setIsBlocking] = useState(false);

  const handleClose = () => {
    if (isBlocking) {
      alert("Are you sure you want to discard your review?");
      setIsBlocking(false);
    } else {
      setShow(false);
    }
  };
  const handleShow = () => setShow(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    facade.addRating(URLs.AddRating(imdbID, rating));
    facade.addReview(URLs.AddReview(imdbID, review));
    handleClose();
  };

  return (
    <>
      <Button onClick={handleShow}>Add Rating and Review</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Rating and Review</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <Stars setIsBlocking={setIsBlocking} setRating={setRating} />
            <br /> <br />
            <h5>Add you review: </h5>
            <textarea
              className="reviewInput"
              onChange={(event) => {
                setIsBlocking(event.target.value.length > 0);
                setReview(event.target.value);
              }}
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <input
              type="submit"
              value="Save"
              onClick={() => setIsBlocking(false)}
            />
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

function Stars({ setIsBlocking, setRating }) {
  return (
    <fieldset
      className="rating"
      onChange={(event) => {
        setRating(event.target.value);
        setIsBlocking(true);
      }}
    >
      <input type="radio" id="star10" name="rating" value="10" />
      <label className="full" for="star10"></label>
      <input type="radio" id="star9" name="rating" value="9" />
      <label className="full" for="star9"></label>
      <input type="radio" id="star8" name="rating" value="8" />
      <label className="full" for="star8"></label>
      <input type="radio" id="star7" name="rating" value="7" />
      <label className="full" for="star7"></label>
      <input type="radio" id="star6" name="rating" value="6" />
      <label className="full" for="star6"></label>
      <input type="radio" id="star5" name="rating" value="5" />
      <label className="full" for="star5"></label>
      <input type="radio" id="star4" name="rating" value="4" />
      <label className="full" for="star4"></label>
      <input type="radio" id="star3" name="rating" value="3" />
      <label className="full" for="star3"></label>
      <input type="radio" id="star2" name="rating" value="2" />
      <label className="full" for="star2"></label>
      <input type="radio" id="star1" name="rating" value="1" />
      <label className="full" for="star1"></label>
    </fieldset>
  );
}
