import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
function Landing() {
  const history = useHistory();
  return(
    <div>
       <h1>Let's find a party</h1>
        <h2>Please log in</h2>
        <button onClick={() => history.push('/login') } >Login</button>

    </div>
  )
}

export default Landing;