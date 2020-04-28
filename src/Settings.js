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
	function Cat() {
		const URL = "https://carolinehoeg.com/semesterprojekt/api/fetch/catpic";
		return URL;
	}

	return { Login, User, Admin, AdminData, Dog, Cat };
}
export default new URLS();
