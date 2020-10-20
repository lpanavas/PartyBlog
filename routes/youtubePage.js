var express = require('express');
const app = require('../app');
var session = require('express-session');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('youtubeVideos/youtubePage.ejs', {message: req.session.user.first});
  });

router.get("/new", function(req, res){
    res.render("youtubeVideos/new.ejs"); 
 });
module.exports = router;
