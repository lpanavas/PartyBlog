import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBlock,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardFooter,
  Button,
  Container,
} from "reactstrap";
function Party(props) {
  const history = useHistory();
  const [parties, setParties] = useState([]);
  const { firstName, lastName, password } =
    (props.location && props.location.state) || {};
  const [search, setSearch] = useState("");

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
    // let { id, name, company, description } = this.props.person;
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

              <Button color="success" href={p.web}>
                Party here !
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

  //     // return parties
  //     //   .map((p) => (
  //         <Card style={{ width: '18rem' }} >
  //         <Card.Img variant="top" src="holder.js/100px180" />
  //         <Card.Body>
  //           <Card.Title>Card Title</Card.Title>
  //           <Card.Text>
  //             Some quick example text to build on the card title and make up the bulk of
  //             the card's content.
  //           </Card.Text>
  //           <Button variant="primary">Go somewhere</Button>
  //         </Card.Body>
  //       </Card>
  //     //   ));
  //   };

  return (
    <div class="container">
      <nav class="navbar  navbar-dark bg-dark">
        <div class="container">
          <a class="navbar-brand">
            <button
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
          </a>

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
      </div>

      <div className="row">{renderParties()}</div>
    </div>
  );
}

export default Party;
