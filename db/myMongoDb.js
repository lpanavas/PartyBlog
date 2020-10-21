const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb+srv://lpanavas:Password1@cluster0.b9bcp.mongodb.net/<dbname>?retryWrites=true&w=majority'


function MyDB() {    
    const database = {}
    database.getNumber = async() => {
        return 1;
    }
    MongoClient.connect(mongoURL, { useUnifiedTopology: true })
        .then(client => {
        database.getUsers = async(user) => {
        
             console.log('Connected to Database')
            const DB = client.db('youtubePage');
        
            const userCollection = DB.collection('userCollection');
            console.log('userCollection')
            users  = DB.collection('userCollection').find({user}).toArray();      
        return users;
    };
        database.insertUser = async(newUser) => {
            const DB = client.db('youtubePage');
        
            const userCollection = DB.collection('userCollection');
            userCollection.insertOne({newUser});
        };
        
    });
    return database;
}
module.exports = MyDB();