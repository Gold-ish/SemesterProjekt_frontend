import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const AppWithRouter = () => {
	return (
		<Router>
			<App />
		</Router>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<AppWithRouter />
	</React.StrictMode>,
	document.getElementById("root")
);
