function URLS() {
	function Login() {
		const URL = "https://carolinehoeg.com/semesterprojekt/api/login";
		return URL;
	}
	function User() {
		const URL = "https://carolinehoeg.com/semesterprojekt/api/info/user";
		return URL;
	}

	function Admin() {
		const URL = "https://carolinehoeg.com/semesterprojekt/api/info/admin";
		return URL;
	}

	function AdminData() {
		const URL = "https://carolinehoeg.com/semesterprojekt/api/fetch";
		return URL;
	}

	function AddRating(movieId, rating) {
		const URL = "https://carolinehoeg.com/semesterprojekt/api/movies/add/rating/"
			+ movieId + "/" + rating;
		return URL;
	}

	function SpecificMovie(id) {
		const URL = "https://carolinehoeg.com/semesterprojekt/api/movies/" + id;
		return URL;
	}
	function Search(title, page) {
		const URL = "https://carolinehoeg.com/semesterprojekt/api/movies/search/" +
			title + "/" + page;
		return URL;
	}

	return { Login, User, Admin, AdminData, SpecificMovie, Search, AddRating };
}
export default new URLS();
