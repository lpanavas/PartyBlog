import React from "react";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Logo from "./partypic2.png";

function NewVenue(props) {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const { firstName, lastName, password } =
    (props.location && props.location.state) || {};
  const [search, setSearch] = useState("");

  async function postData(data) {
    // Default options are marked with *
    const response = await fetch("/party/new", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
  }

  const onSubmit = async (data) => {
    postData(data);
    console.log(data);

    history.push("./partyPage");
  };
  //put functions up here. Like consts that put it in return
  return (
    <div>
      <div class="row">
        <div class="col-8">
          <img
            src={Logo}
            height="600"
            width="1200"
            crop="fill"
            class="img-fluid"
            alt="login party"
          />
        </div>
        <div class="col-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Let's have a party</h1>

            <label>First Name</label>

            <br />
            <input type="text" name="authorFirstName" ref={register} />
            <br />
            <label>Last Name</label>
            <br />
            <input type="text" name="authorLastName" ref={register} />
            <br />
            <label>Place Name</label>
            <br />
            <input type="text" name="name" ref={register} />
            <br />
            <label>Image URL</label>
            <br />
            <input type="text" name="image" ref={register} />
            <br />
            <label>Cost Per Person</label>
            <br />
            <input type="number" name="cost" ref={register} />
            <br />
            <label>Location</label>
            <br />
            <input type="text" name="location" ref={register} />
            <br />
            <label>Website URL</label>
            <br />
            <input type="text" name="website" ref={register} />
            <br />
            <label>Description</label>
            <br />
            <input type="textarea" name="description" ref={register} />
            <br />
            <br />
            <input class="btn btn-success" type="submit" />
          </form>
          <br />
          <button
            type="button"
            class="btn btn-dark"
            onClick={() => history.push("/partyPage")}
          >
            Go to home
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewVenue;
