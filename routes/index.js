var express = require('express');
const app = require('../app');
var session = require('express-session');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb+srv://lpanavas:Password1@cluster0.b9bcp.mongodb.net/<dbname>?retryWrites=true&w=majority'


  

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', {body: 'body'});
});

router.get("/register", function(req, res){
  res.render("register.ejs", {message: '', messageClass: ''}); 
});

router.get("/login", function(req, res){
  res.render("login.ejs", {message: '', messageClass: ''}); 
});

MongoClient.connect(mongoURL, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('youtubePage')
    const userCollection = db.collection('userCollection')
    router.post('/register', (req, res) => {
      const {firstName, lastName, password} = req.body;
      if (!firstName || !lastName|| !password){  
          console.log(firstName)  
          res.render('register.ejs', {
              message: 'Please fill in all required fields',
              messageClass: 'alert-danger'
          });
          return;
      }
      db.collection('userCollection').find({"first":firstName,"last":lastName,"password":password}).toArray()
          .then(results => {
              if(results.length>0){
                  console.log(firstName)  
                  res.render('register.ejs', {
                      message: 'User Already registered',
                      messageClass: 'alert-danger'
                  });
                  return;
              }
              else{
                  userCollection.insertOne({"first": firstName, "last": lastName, "password": password})
                  .then(result => {
                      console.log(result);
                      res.redirect("/login");
                      res.render('login.ejs', {message: 'Please login in using your name and password', messageClass: ''})
                  })    
              }
          })
        });
            router.post('/login', (req, res) => {
              const {firstName, lastName, password} = req.body;
              if (!firstName || !lastName|| !password){  
                  console.log(firstName)  
                  res.render('login.ejs', {
                      message: 'Please fill in all required fields',
                      messageClass: 'alert-danger'
                  });
                  return;
              }
              db.collection('userCollection').find({"first":firstName,"last":lastName,"password":password}).toArray()
                  .then(results => {
                      if(results.length>0){
                          console.log(firstName)  
                          var newUser = {first: firstName, second: lastName, password: password};
                          req.session.user = newUser;
                          console.log(req.session.user.first)
                          res.redirect('/youtubeVideos')
                  }
                  else{
                      res.render('login.ejs', {
                          message: 'Please register',
                          messageClass: 'alert-danger'
                      });
                      return;
                  }
              });
    });
    
})





module.exports = router;
