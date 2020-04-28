import React from "react";

const TopTenTable = ({ movies }) => {
	return (
		<div>
			<p>
				Replace the tbody section with rows generated from the movies endpoint
			</p>
			<table className="topTenTable">
				<tbody>
					<tr>
						<td>Score: %</td>
						<td>Poster</td>
						<td>Title</td>
						<td>Year</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
export default TopTenTable;
