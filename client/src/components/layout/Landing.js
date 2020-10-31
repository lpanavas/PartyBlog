import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
function Landing() {
	const history = useHistory();
	return (
		<div class="container">
			<link rel="stylesheet" href="./main.css" />
			<div class="container2">
				<img
					src="https://static.toiimg.com/photo/67284007/new-year-party.jpg? width: 100%;"
					class="img-fluid"
					alt="hompage"
				/>
			</div>
			<br />

			<div class="row"></div>
			<strong>
				<h1
					class="display-5"
					style={{
						color: "black",
						fontWeight: "bold",
						fontFamily: "Georgia",
					}}
				>
					Log in to find a party
				</h1>
			</strong>
			<br />
			<button
				type="button"
				class="btn btn-info"
				onClick={() => history.push("/login")}
			>
				Log in & Register
			</button>
			<br />
			<br />
			<br />
		</div>
	);
}

export default Landing;
