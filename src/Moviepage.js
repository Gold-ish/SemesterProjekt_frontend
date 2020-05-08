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
      <div className="moviepictures">More pictures</div>
      <div className="reviewcontainer">
        {movie.review !== undefined && ShowReviews(movie.review, imdbID)}
      </div>
    </div>
  );
}

function InfoTable({ movie }) {
  return (
    <table className="movieInfo">
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
    </table>
  );
}

function ShowReviews(reviewArray, imdbID) {
  return (
    <>
      <div className="review">
        <RatingReviewModal imdbID={imdbID} />
        <h3>User reviews: </h3>
      </div>
      {reviewArray.length !== 0 ? (
        <div className="flex-container baseline">
          {reviewArray.map((element) => (
            <div className="reviewCard" key={element.id}>
              <p>
                <b>USERNAME</b>
              </p>
              <p>{element.review}</p>
            </div>
          ))}
        </div>
      ) : (
          <h5>Be the first one to write a review!</h5>
        )}
    </>
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
