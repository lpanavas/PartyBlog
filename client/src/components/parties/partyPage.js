import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import SingleParty from "./singleParty";

import {
  Card,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardFooter,
  Button,
} from "reactstrap";
function Party(props) {
  const [show, setShow] = useState(true);
  const [showUser, setShowUser] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [id, setId] = useState("");
  const history = useHistory();
  const [parties, setParties] = useState([]);
  const { firstName, lastName } =
    (props.location && props.location.state) || {};
  const [search, setSearch] = useState("");

  const firstNameVariable = { firstName };
  const lastNameVariable = { lastName };

  const getParties = async () => {
    console.log("getting posts");
    try {
      const parties = await fetch("/party/parties").then((res) => res.json());
      console.log("got posts", parties);
      setParties(parties);
    } catch (err) {
      console.log("error ", err);
    }
  };

  useEffect(() => {
    getParties();
  }, []); // Only run the first time

  const renderParties = () => {
    return parties
      .filter((p) => p.name && p.name.startsWith(search))
      .map((p) => (
        <div class="card-deck">
          <Card style={{ width: "20rem", margin: "2rem" }} key={p._id}>
            <CardImg
              top
              width="100%"
              src={p.image}
              class="card-img-top"
              alt="party image"
            />

            <CardBody>
              <CardTitle>
                <strong>
                  <h5>{p.name}</h5>
                </strong>
              </CardTitle>

              <CardSubtitle>
                <span class="btn btn-outline-info">Cost ${p.cost}</span>
              </CardSubtitle>

              <CardText>{p.dest}</CardText>
              <CardText>{p.loc}</CardText>

              <Button color="success" href={p.web}>
                Party here !
              </Button>
              <Button
                color="success"
                onClick={() => {
                  setShowComments(true);
                  setShow(false);
                  setShowUser(false);
                  setId(p._id);
                  console.log("id", id);
                }}
              >
                Comments {p.commentList.length}
              </Button>
            </CardBody>

            <CardFooter className="text-muted">
              Created by {p.authorLastName}, {p.authorFirstName}
            </CardFooter>
          </Card>
        </div>
      ));
  };

  // && p.authorLastName && p.authorFirstName === (lastNameVariable.lastName)
  const renderUserParties = () => {
    return parties
      .filter(
        (p) =>
          p.authorFirstName &&
          p.authorFirstName === firstNameVariable.firstName &&
          p.authorLastName &&
          p.authorLastName === lastNameVariable.lastName
      )
      .map((p) => (
        <div class="card-deck">
          <Card style={{ width: "20rem", margin: "2rem" }} key={p._id}>
            <CardImg
              top
              width="100%"
              src={p.image}
              class="card-img-top"
              alt="party image"
            />

            <CardBody>
              <CardTitle>
                <strong>
                  <h5>{p.name}</h5>
                </strong>
              </CardTitle>

              <CardSubtitle>
                <span class="btn btn-outline-info">Cost ${p.cost}</span>
              </CardSubtitle>

              <CardText>{p.dest}</CardText>

              <Button color="success" href={p.web}>
                Party here !
              </Button>
              <Button
                color="success"
                onClick={() => {
                  setShowComments(true);
                  setShow(false);
                  setShowUser(false);
                  setId(p._id);

                  console.log("id", id);
                }}
              >
                Comments {p.commentList.length}
              </Button>
            </CardBody>

            <CardFooter className="text-muted">
              Create by {p.authorLastName}, {p.authorFirstName}
            </CardFooter>
          </Card>
        </div>
      ));
  };

  //   const renderParties = () => {

  return (
    <div class="container">
      <nav class="navbar  navbar-dark bg-dark">
        <div class="container">
          <button
            className="navbar-brand"
            type="button"
            class="btn btn-outline-info"
            onClick={() => history.push("/newVenue")}
          >
            <h4>
              {" "}
              Click here to share &nbsp;
              <span class="badge badge-info">New Party Places !</span>
            </h4>
          </button>

          <form class="form-inline my-2 my-lg-0">
            <label>
              <h5 style={{ color: "white", fontWeight: "bold" }}>
                Search here&nbsp;{" "}
              </h5>
              <input
                class="form-control mr-sm-2"
                type="text"
                placeholder="Halloween"
                value={search}
                onChange={(evt) => setSearch(evt.target.value)}
              ></input>
            </label>
          </form>
        </div>
      </nav>
      <br />

      <button
        type="button"
        class="btn btn-outline-info"
        onClick={(evt) => {
          evt.preventDefault();
          setShow(false);
          setShowUser(true);
          setShowComments(false);
        }}
      >
        <h4>
          <span class="badge badge-info">User HomePage</span>
        </h4>
      </button>

      <button
        type="button"
        class="btn btn-outline-info"
        onClick={(evt) => {
          evt.preventDefault();
          setShow(true);
          setShowUser(false);
          setShowComments(false);
        }}
      >
        <h4>
          <span class="badge badge-info">Main Page</span>
        </h4>
      </button>

      {show ? <div className="row">{renderParties()}</div> : ""}

      {showUser ? (
        <div>
          <h3
            style={{
              color: "black",

              fontFamily: "Georgia",
              fontWeight: "bold",
            }}
          >
            Welcome
          </h3>{" "}
          {firstName} {lastName}
          <div className="row">{renderUserParties()}</div>
        </div>
      ) : (
        ""
      )}

      {showComments ? <SingleParty id={id}></SingleParty> : ""}
    </div>
  );
}

export default Party;
