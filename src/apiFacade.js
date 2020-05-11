import URLS from "./Settings";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/

  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = (user, password, setUsername, setRoles) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URLS.Login(), options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
        setUsername(res.username);
        setRoles(res.role);
      });
  };

  const fetchData = (URL) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL, options).then(handleHttpErrors);
  };

  const addRating = (imdbID, rating, username) => {
    const options = makeOptions("POST", true, {
      user: username,
      rating: rating,
      movieID: imdbID

    });
    return fetch(URLS.AddRating(), options).then(handleHttpErrors);
  };

  const editRating = (imdbID, rating, username, ID) => {
    const options = makeOptions("PUT", true, {
      user: username,
      rating: rating,
      movieID: imdbID,
      id: ID

    });
    return fetch(URLS.EditRating(), options).then(handleHttpErrors);
  };

  const deleteRating = (imdbID, rating, username, ID) => {
    const options = makeOptions("DELETE", true, {
      user: username,
      rating: rating,
      movieID: imdbID,
      id: ID

    });
    return fetch(URLS.DeleteRating(), options).then(handleHttpErrors);
  };

  const addReview = (imdbID, review, username) => {
    const options = makeOptions("POST", true, {
      user: username,
      review: review,
      movieID: imdbID

    });
    return fetch(URLS.AddReview(), options).then(handleHttpErrors);
  };

  const editReview = (imdbID, review, username, ID) => {
    const options = makeOptions("PUT", true, {
      user: username,
      review: review,
      movieID: imdbID,
      id: ID

    });
    return fetch(URLS.EditReview(), options).then(handleHttpErrors);
  };

  const deleteReview = (imdbID, review, username, ID) => {
    const options = makeOptions("DELETE", true, {
      user: username,
      review: review,
      movieID: imdbID,
      id: ID

    });
    return fetch(URLS.DeleteReview(), options).then(handleHttpErrors);
  };

  const registerUser = (
    user,
    password,
    gender,
    birthday,
    setUsername,
    setRoles
  ) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
      gender: gender,
      birthday: birthday,
    });
    return fetch(URLS.Register(), options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
        setUsername(res.username);
        setRoles(res.role);
        console.log(res.role);
      });
  };

  const editUser = (user, gender,
    birthday) => {
    const options = makeOptions("PUT", false, {
      username: user,
      gender: gender,
      birthday: birthday
    });
    return fetch(URLS.EditUser(), options)
    .then(handleHttpErrors);
  }

  const deleteUser = (user, gender,
    birthday) => {
      const options = makeOptions("DELETE", false, {
        username: user,
        gender: gender,
        birthday: birthday
      });
      return fetch(URLS.DeleteUser(), options)
      .then(handleHttpErrors);
  }

  const getMovieTrailer = (title) => {
    return fetch(URLS.MovieTrailer(title)).then(handleHttpErrors);
  }

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    addRating,
    addReview,
    editRating,
    editReview,
    deleteRating,
    deleteReview,
    registerUser,
    editUser,
    deleteUser,
    getMovieTrailer
  };
}
const facade = apiFacade();
export default facade;
