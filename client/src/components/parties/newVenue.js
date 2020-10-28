import React from "react";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect }  from "react";

function NewVenue(props) {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const { firstName, lastName, password } =
    (props.location && props.location.state) || {};
    const [search, setSearch] = useState("");


  async function postData(data) {
    // Default options are marked with *
    const response = await fetch("/party/new", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
  }

  const onSubmit = async(data) => {
    postData(data);
    console.log(data);
     
    history.push("./partyPage");
  };
    //put functions up here. Like consts that put it in return 
  return(
    <div>
     
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Let's have a party</h1>
        <label>First Name</label>
        <input 
          type = "text" 
          name = "authorFirstName"
          ref = {register}/>
          
          <label>Last Name</label>
        <input 
          type = "text" 
          name = "authorLastName"
          ref = {register}/>
          
        <label>Name</label>
        <input 
          type = "text" 
          name = "name"
          ref = {register}/>
          
        <label>Image URL</label>
        <input 
          type = "text" 
          name = "image"
          ref = {register}/>
        <label>Cost Per Person</label>
        <input 
          type = "number" 
          name = "cost"
          ref = {register}/>
        <label>Location</label>
          <input 
          type = "text" 
          name = "location"
          ref = {register}/>
        <label>Website URL</label>
          <input 
          type = "text" 
          name = "website"
          ref = {register}/>
        <label>Description</label>
          <input 
          type = "text" 
          name = "description"
          ref = {register}/>
      <input type="submit" />
    </form>

      <button onClick={() => history.push('/partyPage') } >Go to home</button>

     
    </div>
    
  )
}

export default NewVenue;