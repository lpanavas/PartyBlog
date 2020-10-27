const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb+srv://lpanavas:Password1@cluster0.b9bcp.mongodb.net/<dbname>?retryWrites=true&w=majority'


function MyDB() {    
    const database = {}
    
    MongoClient.connect(mongoURL, { useUnifiedTopology: true })
        .then(client => {
        database.getUsers = async(user) => {
        
             
            const DB = client.db('youtubePage');
        
            const userCollection = DB.collection('userCollection');
            // console.log(user);
            users  = await DB.collection('userCollection').find(user).toArray();
            // console.log(users) ;
               
        return users;
    };
        database.insertUser = async(newUser) => {
            const DB = client.db('youtubePage');
        
            const userCollection = DB.collection('userCollection');
            userCollection.insertOne(newUser);
    };
    database.insertParty = async(newParty) => {
        const DB = client.db('youtubePage');
    
        const userCollection = DB.collection('partyPlaces');
        userCollection.insertOne(newParty);
    };  
    database.getParties = async(parties) => {
        const DB = client.db('youtubePage');
        
        const userCollection = DB.collection('partyPlaces');
        console.log(parties);
        parties = await userCollection.find(parties).toArray();
        // console.log(parties);
       
        return parties;
    };
    database.addComment = async(comments) => {
        const DB = client.db('youtubePage');
        const userCollection = DB.collection('partyPlaces');
        userCollection.findOneAndUpdate(
            {name: comments[0]},
            {$push: {comments: {firstName: comments[1], lastName: comments[2], comment: comment[3]}}}
        );
    } 
    });
    return database;
}
module.exports = MyDB();