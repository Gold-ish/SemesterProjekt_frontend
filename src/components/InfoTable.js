import React from "react";

export default function InfoTable({ movie }) {
    return (
      <table className="movieInfo">
        <thead>
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
        </thead>
      </table>
    );
  }