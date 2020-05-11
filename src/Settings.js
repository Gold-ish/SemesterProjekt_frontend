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

  function AddRating() {
    const URL =
      "https://carolinehoeg.com/semesterprojekt/api/movies/add/rating/";
    return URL;
  }

  function AddReview() {
    const URL =
      "https://carolinehoeg.com/semesterprojekt/api/movies/add/review/";
    return URL;
  }

  function EditRating() {
    const URL =
      "https://carolinehoeg.com/semesterprojekt/api/movies/edit/rating/";
    return URL;
  }

  function EditReview() {
    const URL =
      "https://carolinehoeg.com/semesterprojekt/api/movies/edit/review/";
    return URL;
  }

  function EditUser() {
    const URL =
      "https://carolinehoeg.com/semesterprojekt/api/info/user/edit";
    return URL;
  }

  function DeleteRating() {
    const URL =
      "https://carolinehoeg.com/semesterprojekt/api/movies/delete/rating/";
    return URL;
  }

  function DeleteReview() {
    const URL =
      "https://carolinehoeg.com/semesterprojekt/api/movies/delete/review/";
    return URL;
  }

  function DeleteUser() {
    const URL =
      "https://carolinehoeg.com/semesterprojekt/api/info/user/delete";
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

  function MovieTrailer(title) {
    let formattedTitle = title.split(" ").join("+");
    const URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
      formattedTitle +
      "%20trailer&maxResults=1&key=AIzaSyCQYuA0lPDrnTZodP6U6mMFf5lENB6bb08";
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
    EditRating,
    EditReview,
    DeleteRating,
    DeleteReview,
    Register,
    EditUser,
    DeleteUser, 
    MovieTrailer
  };
}
export default new URLS();
