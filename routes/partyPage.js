var express = require('express');
const app = require('../app');
var session = require('express-session');
var router = express.Router();

//nothing so far 
router.get('/', function(req, res, next) {
  //message tests that the user is active. you can use this to keep track of the users
    res.render('party/partyPage.ejs', {message: req.session.user.first});
  });
//form to upload a new blog
router.get("/new", function(req, res){
    res.render("party/new.ejs"); 
 });
module.exports = router;
