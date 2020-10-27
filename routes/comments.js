var express = require('express');
const app = require('../app');
var session = require('express-session');
var router = express.Router();
const myDB = require('../db/myMongoDb.js')
var ObjectId = require('mongodb').ObjectId; 

router.get('/:commentID', async (req, res) => {
    // console.log('hello');
    var id = req.params.commentID;
    
    var o_id = new ObjectId(id);
  console.log(id, o_id);
  await myDB.getParties({"_id": o_id})
    .then(result => {
        // console.log(result);
        res.render('comments/cardHome.ejs', {parties: result});
    });     

});


module.exports = router;
