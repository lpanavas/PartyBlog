var express = require('express');
const app = require('../app');
var session = require('express-session');
var router = express.Router();
const myDB = require('../db/myMongoDb.js')
var ObjectId = require('mongodb').ObjectId; 
//nothing so far 
router.get('/', async (req, res) => {
  //message tests that the user is active. you can use this to keep track of the users
  await myDB.getParties()
    .then(result => {
        // console.log(result);
        res.render('party/partyPage.ejs', {parties: result});
    });       
 
  });
  router.get('/parties', async (req, res) => {
    const parties = await myDB.getParties();
  res.json(parties);
  // res.send(req.session.user);
  console.log("user in parties", req.session.user);
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
  var authorFirstName= req.body.authorFirstName;
  var authorLastName = req.body.authorLastName;
  var newPartyPlace = {"name": name, "image": image, "cost": cost, "loc":loc, "web": web, "dest": dest, "authorFirstName": authorFirstName, "authorLastName": authorLastName, commentList: []};
  console.log(newPartyPlace)
  await myDB.insertParty(newPartyPlace);
});
router.post("/comment", async (req, res) => {
  var id = req.body._id;
 
  var authorFirstName= req.body.authorFirstName;
  var authorLastName = req.body.authorLastName;
  var comment = req.body.comment;
  // var newPartyPlace = {"_id": _id, "authorFirstName": authorFirstName, "authorLastName": authorLastName, "comment": comment};
  var newPartyPlace = [id, authorFirstName,  authorLastName, comment];
  await myDB.addComment(newPartyPlace);
});




router.get("/currentUser", async (req, res) => {
  //find the campground with provided ID
  var authorFirstName= req.session.user.first;
  var authorLastName = req.session.user.last;
  console.log(authorFirstName, authorLastName);
  await myDB.getParties({"authorFirstName": authorFirstName, "authorLastName": authorLastName})
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
