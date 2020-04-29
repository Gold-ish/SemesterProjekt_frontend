import React from "react";

const TopTenTable = ({ movies }) => {
	return (
		<div>
			<p>
				Replace the tbody section with rows generated from the movies endpoint
			</p>
			{/* <table className="topTenTable">
				<tbody>
        {movies.map((movie, index) => {
          return (
            <tr key={index}>
              <td>{movie.score}</td>
              <td>{movie.poster}</td>
			  <td>{movie.title}</td>
              <td>{movie.year}</td>
            </tr>
          );
        })}
      </tbody>
    </table> */}
		</div>
	);
};
export default TopTenTable;
