import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import facade from "./apiFacade";
import URLs from "./Settings";


export function MoviePage() {
	let { imdbID } = useParams();
	const [movie, setMovie] = useState("Loading...");

	useEffect(() => {
		facade.fetchData(URLs.SpecificMovie(imdbID)).then((data) => {
			setMovie(data);
		});
	}, []);

	return (
		<div>
			<br />
			<h3>{movie.Title}</h3>
			<div className="container">
				<div className="movieinfo">Year: {movie.Year}</div>
				<div className="movieposter">
					<img src={movie.Poster} alt={movie.Title}></img>
				</div>
			</div>
			<br />
			<div className="movieavgrating"><h5>Average rating: {movie.avgRating}</h5></div>
			<div className="moviescore">90%</div>
			<div className="movieplot">"movie.plot"</div>
			<div className="moviepictures">More picturs</div>
			<div className="reviewcontainer">
				<RatingModal imdbID={imdbID} />
				<div className="review">Review 1 - Skal laves fleksibelt med map</div>
				<div className="review">Review 2 - Skal laves fleksibelt med map</div>
				<div className="review">Review 3 - Skal laves fleksibelt med map</div>
				<div className="review">Review 4 - Skal laves fleksibelt med map</div>
			</div>
		</div>
	);
}

function RatingModal({ imdbID }) {
	const [show, setShow] = useState(false);
	const [rating, setRating] = useState();
	const [isBlocking, setIsBlocking] = useState(false);

	const handleClose = () => {
		if (isBlocking) {
			alert("Are you sure you want to discard your rating?");
			setIsBlocking(false);
		} else {
			setShow(false);
		}
	};
	const handleShow = () => setShow(true);
	const handleSubmit = (event) => {
		event.preventDefault();
		facade.addRating(URLs.AddRating(imdbID, rating));
		handleClose();
	}

	return (
		<>
			<Button onClick={handleShow}>Add rating</Button>

			<Modal show={show} onHide={handleClose} >
				<Modal.Header closeButton>
					<Modal.Title>Add rating</Modal.Title>
				</Modal.Header>
				<form onSubmit={handleSubmit}>
					<Modal.Body>
						<p>Add you rating between 0 and 10:   </p>
						<input type="number" id="rating" min="0" max="10"
							onChange={event => {
								setIsBlocking(event.target.value.length > 0);
								setRating(event.target.value);
							}} />
					</Modal.Body>
					<Modal.Footer>
						<input type="submit" value="Save rating" onClick={() => setIsBlocking(false)} />
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
}
