var express = require('express');
const app = require('../app');
var session = require('express-session');
// import connectStore from "connect-mongo";
var router = express.Router();


var sess;
const myDB = require('../db/myMongoDb.js')

// router.use(function(req, res, next) {
// 	console.log('Session from keys');
//   console.log(req.session);
//   console.log("user", req.session.user);
//   if (req.session.user) {
//       return res.send(req.session.user);
//   }
//   next()
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  sess = req.session;
  console.log("session user", sess.user)
  res.render('index.ejs', {body: 'body'});
});

//Gets the register page
router.get("/register", function(req, res){
  
  res.render("register.ejs", {message: '', messageClass: ''}); 
});

//gets the login page
router.get("/login", function(req, res){
  res.render("login.ejs", {message: '', messageClass: ''}); 
});
router.get('/users', async (req, res) => {
  const posts = await myDB.getUsers();
  res.json(posts);

});



// This is done later on but this is the correct way. This is how he did it in h
router.post('/register', async (req, res) => {
  console.log("hello");
  sess=req.session;
  const {firstName, lastName, password} = req.body;
  const query = {"first":firstName,"last":lastName,"password":password}
  var newUser = {first: firstName, last: lastName, password: password};
  req.session.user = newUser;
  // sess.email = newUser;
  // console.log("current user", req.session.user);
  console.log("current user", req.session.user);
  // res.send(req.session.user);
  await myDB.insertUser(query);
 });
//   console.log(query);
//   // if (!firstName || !lastName|| !password){  
//   //   //re renders with message if not filled out
//   //   res.render('register.ejs', {
//   //       message: 'Please fill in all required fields',
//   //       messageClass: 'alert-danger'
//   //   });
//   //   return;
// }
//   // const results = await myDB.getUsers(query);
  
//   const results = await myDB.getUsers(query);
//   // console.log(results)
//     //checks if user exists
//       if(results.length>0){
           
//           // res.render('register.ejs', {
//           //     message: 'User Already registered',
//           //     messageClass: 'alert-danger'
//           // });
//           return;
//         }
//         else{
//           await myDB.insertUser(query)
//           .then(result => {
//               // console.log(result);
//               //takes you to login page
//               res.redirect("/login");
//               res.render('login.ejs', {message: 'Please login in using your name and password', messageClass: 'alert'})
//           })    
//       }
  


  router.post('/login', async (req, res) => {
                  const {firstName, lastName, password} = req.body;
                  const query = {"first":firstName,"last":lastName,"password":password}
                  //same thing to check if all is filled out
                  if (!firstName || !lastName|| !password){  
                      console.log(firstName)  
                      res.render('login.ejs', {
                          message: 'Please fill in all required fields',
                          messageClass: 'alert-danger'
                      });
                      return;
                  }
                  //checks that user exists
                  const results = await myDB.getUsers(query);
                      
                          if(results.length>0){
                              // console.log(firstName)  
                              //creates new user. Uses express session. This will keep track of the user throughout the time they are on the website
                              
                              // console.log(req.session.user.first)
                              //redirects to the party page
                              res.redirect('/party')
                      }
                      else{
                          res.render('login.ejs', {
                              message: 'Please register',
                              messageClass: 'alert-danger'
                          });
                          return;
                      }
                  });

//need this at the end of js files  
module.exports = router;
