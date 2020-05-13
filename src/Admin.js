import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import URLS from "./Settings";

export function Admin({ isLoggedIn, setLoginStatus }) {
  return (
    <div>
      <br />
      {AdminFetch({ isLoggedIn, setLoginStatus })}
      {Fetching()}
    </div>
  );
}

function AdminFetch({ isLoggedIn, setLoginStatus }) {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    facade.fetchData(URLS.Admin()).then((data) => setDataFromServer(data.msg));
  }, []);
  return (
    <div>
      <h2>Admin</h2>
      <h3>{dataFromServer}</h3>
    </div>
  );
}

function Fetching() {
  const [dataFromServer, setDataFromServer] = useState("Loading...");
  useEffect(() => {
    facade.fetchData(URLS.AdminData()).then((data) => {
      let returnData = "";
      for (let key in data) {
        returnData += key + ": " + data[key] + " \n";
        console.log(key, data[key]);
      }
      setDataFromServer(returnData);
      console.log(returnData);
    });
  }, []);
  return <p>{dataFromServer}</p>;
}
