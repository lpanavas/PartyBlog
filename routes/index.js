var express = require('express');
const app = require('../app');
var session = require('express-session');
var router = express.Router();

const myDB = require('../db/myMongoDb.js')



/* GET home page. */
router.get('/', function(req, res, next) {
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
  const {firstName, lastName, password} = req.body;
  const query = {"first":firstName,"last":lastName,"password":password}
  var newUser = {first: firstName, last: lastName, password: password};
   req.session.user = newUser;
  await myDB.insertUser(query);
  res.status(200).send({ inserted: true });
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
  
  });

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

// Have to put everything in mongoDB database inside of MongoClient.connect I think
// Haven't found a better way but I am sure thaere is one
// MongoClient.connect(mongoURL, { useUnifiedTopology: true })
//   .then(client => {
//     console.log('Connected to Database')
//     //This is the data base. We can just keep this name because it doens't matter too much
//     const db = client.db('youtubePage')
//     //This is the collection. Where the actual users are stored
//     const userCollection = db.collection('userCollection')
//     //Dictates what happens on the register page when the form is submitted
//     router.post('/register', (req, res) => {
//       //gets values from form
//       const {firstName, lastName, password} = req.body;
//       //checks if form parts are filled out 
//       if (!firstName || !lastName|| !password){  
//           //re renders with message if not filled out
//           res.render('register.ejs', {
//               message: 'Please fill in all required fields',
//               messageClass: 'alert-danger'
//           });
//           return;
//       }
//       //otherwise access data base and looks for user 
//       db.collection('userCollection').find({"first":firstName,"last":lastName,"password":password}).toArray()
//           .then(results => {
//             //checks if user exists
//               if(results.length>0){
                   
//                   res.render('register.ejs', {
//                       message: 'User Already registered',
//                       messageClass: 'alert-danger'
//                   });
//                   return;
//               }
//               //if user doesn't exist insert new user into databse
//               else{
//                   userCollection.insertOne({"first": firstName, "last": lastName, "password": password})
//                   .then(result => {
//                       console.log(result);
//                       //takes you to login page
//                       res.redirect("/login");
//                       res.render('login.ejs', {message: 'Please login in using your name and password', messageClass: 'alert'})
//                   })    
//               }
//           })
//         });
//         //dicates what happens at login
//             router.post('/login', (req, res) => {
//               const {firstName, lastName, password} = req.body;
//               //same thing to check if all is filled out
//               if (!firstName || !lastName|| !password){  
//                   console.log(firstName)  
//                   res.render('login.ejs', {
//                       message: 'Please fill in all required fields',
//                       messageClass: 'alert-danger'
//                   });
//                   return;
//               }
//               //checks that user exists
//               db.collection('userCollection').find({"first":firstName,"last":lastName,"password":password}).toArray()
//                   .then(results => {
//                       if(results.length>0){
//                           console.log(firstName)  
//                           //creates new user. Uses express session. This will keep track of the user throughout the time they are on the website
//                           var newUser = {first: firstName, second: lastName, password: password};
//                           req.session.user = newUser;
//                           console.log(req.session.user.first)
//                           //redirects to the party page
//                           res.redirect('/party')
//                   }
//                   else{
//                       res.render('login.ejs', {
//                           message: 'Please register',
//                           messageClass: 'alert-danger'
//                       });
//                       return;
//                   }
//               });
//     });
    
// })




//need this at the end of js files  
module.exports = router;
