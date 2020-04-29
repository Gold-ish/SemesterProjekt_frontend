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

	function SpecificMovie(id) {
		const URL = "https://carolinehoeg.com/semesterprojekt/api/movies/tt0076759";
		return URL;
	}
	function Search(title, page) {
		const URL =
			"https://carolinehoeg.com/semesterprojekt/api/movies/search/" +
			title +
			"/" +
			page;
		return URL;
	}

	return { Login, User, Admin, AdminData, SpecificMovie, Search };
}
export default new URLS();
