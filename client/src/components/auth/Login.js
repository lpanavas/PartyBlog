import React from "react";
import loginP from "./loginP.png";

import { useHistory } from "react-router-dom";

import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Login = (props) => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    console.log("getting posts");
    try {
      const _posts = await fetch("/register").then((res) => res.json());
      console.log("got posts", posts);
      setPosts(_posts);
    } catch (err) {
      console.log("error ", err);
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    props.history.push({
      pathname: "/partyPage",
      state,
    });
    console.log(state);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //put functions up here. Like consts that put it in return
  return (
    <div class="container">
      <div class="row">
        <div class="col-8">
          <img
            src={loginP}
            height="600"
            width="1200"
            crop="fill"
            class="img-fluid"
            alt="login party"
          />
        </div>

        <div class="col-4">
          <h1
            style={{
              color: "black",
              fontWeight: "bold",
              fontFamily: "Georgia",
            }}
          >
            <br />
            Regisration <br />
            <br />
          </h1>
          <Form className="register-form" onSubmit={handleOnSubmit}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Passord</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="info" type="submit">
              Register & Log in
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
