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

	function Dog() {
		const URL = "https://carolinehoeg.com/semesterprojekt/api/fetch/dogpic";
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

	return { Login, User, Admin, AdminData, Dog, Search };
}
export default new URLS();
