function URLS() {
  function Login() {
    const URL = "https://carolinehoeg.com/semesterprojekt/api/login";
    return URL;
  }
  function Register() {
    const URL = "https://carolinehoeg.com/semesterprojekt/api/login/register";
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
    const URL =
      "https://carolinehoeg.com/semesterprojekt/api/movies/add/rating/" +
      movieId +
      "/" +
      rating;
    return URL;
  }

  function AddReview(movieId, rating) {
    const URL =
      "https://carolinehoeg.com/semesterprojekt/api/movies/add/review/" +
      movieId +
      "/" +
      rating;
    return URL;
  }

  function SpecificMovie(id) {
    const URL = "https://carolinehoeg.com/semesterprojekt/api/movies/" + id;
    return URL;
  }
  function Search(title, page) {
    let formattedTitle = title.split(" ").join("+");
    const URL =
      "https://carolinehoeg.com/semesterprojekt/api/movies/search/" +
      formattedTitle +
      "/" +
      page;
    return URL;
  }

  return {
    Login,
    User,
    Admin,
    AdminData,
    SpecificMovie,
    Search,
    AddRating,
    AddReview,
    Register,
  };
}
export default new URLS();
