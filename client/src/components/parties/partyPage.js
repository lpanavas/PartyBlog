import React, { useState, useEffect }  from "react";

import { useHistory } from "react-router-dom";
import { Card, CardImg, CardText, CardBlock,
    CardTitle, CardSubtitle, CardBody, Button } from 'reactstrap';
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
            .map((p) => ((
          <div>
            <Card style={{ width: '18rem' }} key={p._id}>
              <CardImg top width="100%" src= {p.image} alt="Card image cap" />
              <CardBody>
                <CardTitle>{p.name}</CardTitle>
                <CardSubtitle>Cost ${p.cost}</CardSubtitle>
                <CardText>{p.dest}</CardText>
                <Button href={p.web}>Website</Button>
                <CardText>Create by {p.authorLastName}, {p.authorFirstName}</CardText>
              </CardBody>
            </Card>
          </div>
        )));
            
  };


  return(
    <div>
       <h1>Party Page</h1>
       <div>
          <strong>Welcome</strong> {firstName} {lastName}
        </div>
       <button onClick={() => history.push('/newVenue') } >New Party Place</button>
       <label>
            Search by:{" "}
            <input
                 type="text"
             value={search}
              onChange={(evt) => setSearch(evt.target.value)}
            ></input>
        </label>
        <div className = "row">       
            {renderParties()}
            </div>
       
    </div>
  )
}

export default Party;