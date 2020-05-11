import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShowMovieTrailer } from './ShowMovieTrailer';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import facade from "./apiFacade";
import URLs from "./Settings";
import star from "./Yellow_star.svg";

export function MoviePage({ username }) {
  let { imdbID } = useParams();
  const [movie, setMovie] = useState("Loading...");

  useEffect(() => {
    let shouldFetch = true;
    if (shouldFetch) {
      facade.fetchData(URLs.SpecificMovie(imdbID)).then((data) => {
        setMovie(data);
      });
    }
    return () => shouldFetch = false;
  }, [imdbID]);

  const showAvgRating = (movie) => {
    if (movie.avgRating !== -1) {
      return movie.avgRating;
    } else {
      return "TBD";
    }
  };

  return (
    <div>
      <br />
      <h3>{movie.Title}</h3>
      <div className="flex-container">
        <InfoTable movie={movie} />
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
      <div className="movietrailer">
        <br />
        <h5>Watch the trailer here!</h5>
        {movie.Title !== undefined && <ShowMovieTrailer title={movie.Title} />}
        <br /><br />
      </div>
      <div className="reviewcontainer">
        {movie.review !== undefined && ShowReviews(movie.review, movie.rating, imdbID, username)}
      </div>
    </div>
  );
}

function InfoTable({ movie }) {
  return (
    <table className="movieInfo">
      <thead>
        <tr>
          <td className="right bold">Year:</td>
          <td>{movie.Year}</td>
        </tr>
        <tr>
          <td className="right bold">Rated:</td>
          <td>{movie.Rated}</td>
        </tr>
        <tr>
          <td className="right bold">Released:</td>
          <td>{movie.Released}</td>
        </tr>
        <tr>
          <td className="right bold">Runtime:</td>
          <td>{movie.Runtime}</td>
        </tr>
        <tr>
          <td className="right bold">Genre:</td>
          <td>{movie.Genre}</td>
        </tr>
        <tr>
          <td className="right bold">Director:</td>
          <td>{movie.Director}</td>
        </tr>
        <tr>
          <td className="right bold">Actors:</td>
          <td>{movie.Actors}</td>
        </tr>
        <tr>
          <td className="right bold">Language:</td>
          <td>{movie.Language}</td>
        </tr>
        <tr>
          <td className="right bold">Awards:</td>
          <td>{movie.Awards}</td>
        </tr>
        <tr>
          <td className="right bold">Type:</td>
          <td>{movie.Type}</td>
        </tr>
        <tr>
          <td className="right bold">DVD release:</td>
          <td>{movie.DVD}</td>
        </tr>
        <tr>
          <td className="right bold">Production:</td>
          <td>{movie.Production}</td>
        </tr>
      </thead>
    </table>
  );
}

function ShowReviews(reviewArray, ratingArray, imdbID, username) {
  let ownReview = { reviewid: undefined, ratingid: undefined, review: undefined, rating: undefined }

  let idididi = reviewArray.find(x => x.user === username);
  if (idididi !== undefined) { ownReview.reviewid = idididi.id }
  let reviewtext = reviewArray.find(x => x.user === username);
  if (reviewtext !== undefined) { ownReview.review = reviewtext.review }
  let idrating = ratingArray.find(x => x.user === username);
  if (idrating !== undefined) { ownReview.ratingid = idrating.id }
  let ratingText = ratingArray.find(x => x.user === username);
  if (ratingText !== undefined) { ownReview.rating = ratingText.rating }

  const getRating = (username) => {
    return ratingArray.find(x => x.user === username).rating;
  };

  function MoveOwnReviewToFirstPosition(array, username) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].props.children[0].key === username) {
        var a = array.splice(i, 1);   // removes the item
        array.unshift(a[0]);         // adds it back to the beginning
        break;
      }
    }
    return array;
  }

  return (
    <>
      <div className="review">
        {username !== undefined && ownReview.reviewid === undefined && <RatingReviewModal imdbID={imdbID} username={username} />}
        {username !== undefined && ownReview.reviewid !== undefined && <EditRatingReviewModal
          imdbID={imdbID}
          username={username}
          reviewProp={ownReview.review}
          ratingProp={ownReview.rating}
          reviewID={ownReview.reviewid}
          ratingID={ownReview.ratingid} />

        }
        {username === undefined && <p className="right blue"><b>Login to make review and rating</b></p>}
        <h3>User reviews: </h3>

      </div>
      {reviewArray.length !== 0 ? (
        <div className="flex-container baseline">
          {MoveOwnReviewToFirstPosition(reviewArray.map((element) => (
            <div className="reviewCard" key={element.id}>
              <p key={element.user}>
                {element.user !== undefined ? <b>{element.user}</b> : <b>-Anonymous-</b>}
              </p>
              {getRating(element.user)}/10
              <img
                src={star}
                className="ratingStarTable"
                alt="star"
              />
              <p>{element.review}</p>
            </div>
          )), username)}
        </div>
      ) : (
          <h5>Be the first one to write a review!</h5>
        )}
    </>
  );
}

function RatingReviewModal({ imdbID, username }) {
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
    facade.addRating(imdbID, rating, username);
    facade.addReview(imdbID, review, username);
    handleClose();
  };

  return (
    <>
      <Button onClick={handleShow} className="right">
        Add Rating and Review
      </Button>

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

function EditRatingReviewModal({ imdbID, username, reviewProp, ratingProp, reviewID, ratingID }) {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(ratingProp);
  const [review, setReview] = useState(reviewProp);
  const [isBlocking, setIsBlocking] = useState(false);
  const [buttonPress, setButtonPress] = useState();

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
    if (buttonPress === "edit") {
      facade.editRating(imdbID, rating, username, ratingID);
      facade.editReview(imdbID, review, username, reviewID);
    } else if (buttonPress === "delete") {
      facade.deleteRating(imdbID, rating, username, ratingID);
      facade.deleteReview(imdbID, review, username, reviewID);
    }
    handleClose();
  };

  return (
    <>
      <Button onClick={handleShow} className="right">
        Edit Rating and Review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Rating and Review</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <Stars setIsBlocking={setIsBlocking} setRating={setRating} rating={rating} />
            <br /> <br />
            <h5>Add you review: </h5>
            <textarea
              className="reviewInput"
              onChange={(event) => {
                setIsBlocking(event.target.value.length > 0);
                setReview(event.target.value);
              }}
            >{review}</textarea>
          </Modal.Body>
          <Modal.Footer>
            <input
              name="delete"
              type="submit"
              value="delete"
              onClick={() => {
                setButtonPress("delete")
                setIsBlocking(false)
              }}
            />
            <input
              name="edit"
              type="submit"
              value="edit"
              onClick={() => {
                setButtonPress("edit")
                setIsBlocking(false)
              }}
            />
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

function Stars({ setIsBlocking, setRating, rating }) {

  return (
    <fieldset
      className="rating"
      onChange={(event) => {
        setRating(event.target.value);
        console.log(event.target.value);
        setIsBlocking(true);
      }}
    >
      <input type="radio" id="star10" name="rating" value="10" />
      <label className="full" htmlFor="star10"></label>
      <input type="radio" id="star9" name="rating" value="9" />
      <label className="full" htmlFor="star9"></label>
      <input type="radio" id="star8" name="rating" value="8" />
      <label className="full" htmlFor="star8"></label>
      <input type="radio" id="star7" name="rating" value="7" />
      <label className="full" htmlFor="star7"></label>
      <input type="radio" id="star6" name="rating" value="6" />
      <label className="full" htmlFor="star6"></label>
      <input type="radio" id="star5" name="rating" value="5" />
      <label className="full" htmlFor="star5"></label>
      <input type="radio" id="star4" name="rating" value="4" />
      <label className="full" htmlFor="star4"></label>
      <input type="radio" id="star3" name="rating" value="3" />
      <label className="full" htmlFor="star3"></label>
      <input type="radio" id="star2" name="rating" value="2" />
      <label className="full" htmlFor="star2"></label>
      <input type="radio" id="star1" name="rating" value="1" />
      <label className="full" htmlFor="star1"></label>
    </fieldset>
  );
}
