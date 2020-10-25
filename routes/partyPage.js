var express = require('express');
const app = require('../app');
var session = require('express-session');
var router = express.Router();
const myDB = require('../db/myMongoDb.js')
//nothing so far 
router.get('/', function(req, res, next) {
  //message tests that the user is active. you can use this to keep track of the users
    res.render('party/partyPage.ejs', {message: req.session.user.first});
  });
//form to upload a new blog
router.get("/new", function(req, res){
    res.render("party/new.ejs"); 
 });


router.post("/", async (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var cost = req.body.cost;
  var loc = req.body.location;
  var web = req.body.website;
  var dest = req.body.description;
  var authorFirstName= req.session.user.first;
  var authorLastName = req.session.user.last;
 

  var newPartyPlace = {"name": name, "image": image, "cost": cost, "loc":loc, "web": web, "dest": dest, "authorFirstName": authorFirstName, "authorLastName": authorLastName};
  console.log(newPartyPlace)
  await myDB.insertParty(newPartyPlace)
          .then(result => {
              console.log(result);
              //takes you to login page
              res.render('party/partyPage.ejs', {message: req.session.user.first});
              // res.redirect("/party");
          });
});

module.exports = router;
