var express = require('express');
const app = require('../app');
var session = require('express-session');
var router = express.Router();
const myDB = require('../db/myMongoDb.js')
//nothing so far 
router.get('/', async (req, res) => {
  //message tests that the user is active. you can use this to keep track of the users
  await myDB.getParties()
    .then(result => {
        // console.log(result);
        res.render('party/partyPage.ejs', {parties: result});
    });       
 
  });
//form to upload a new blog
router.get("/new", function(req, res){
    res.render("party/new.ejs"); 
 });
router.post("/new", async (req, res) => {

  var name = req.body.name;
  var image = req.body.image;
  var cost = req.body.cost;
  var loc = req.body.location;
  var web = req.body.website;
  var dest = req.body.description;
  var authorFirstName= req.session.user.first;
  var authorLastName = req.session.user.last;
  var newPartyPlace = {"name": name, "image": image, "cost": cost, "loc":loc, "web": web, "dest": dest, "authorFirstName": authorFirstName, "authorLastName": authorLastName, comments: null};
  console.log(newPartyPlace)
  await myDB.insertParty(newPartyPlace)
          .then(result => {
              console.log("here");
              //takes you to login page
              
              
              // res.redirect("/party");
          });
  await myDB.getParties()
  .then(result => {
      // console.log(result);
      res.render('party/partyPage.ejs', {parties: result});
  });
});
router.get("/comment", function(req, res){
  res.render("party/comment.ejs"); 
});

router.post("/comment", async (req, res) => {
  var comment = req.body.comment;
  console.log(comment);
  res.redirect('/party');
  // await myDB.getParties()
  // .then(result => {
  //     // console.log(result);
  //     res.render('party/partyPage.ejs', {parties: result});
  // });
});


router.get("/:id", async (req, res) => {
  //find the campground with provided ID
  var authorFirstName= req.session.user.first;
  var authorLastName = req.session.user.last;
  console.log(authorFirstName, authorLastName);
  await myDB.getParties({"authorFirstName": authorFirstName, "authorLastName": authorLastName})
    .then(result => {
        // console.log(result);
        res.render('party/userPage.ejs', {parties: result});
    });       
 
});

module.exports = router;
