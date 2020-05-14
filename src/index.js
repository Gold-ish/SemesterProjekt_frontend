import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

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
