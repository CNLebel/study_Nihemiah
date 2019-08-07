module.exports = {
    mongoURI: "mongodb+srv://test:LItong1998@cluster0-04dq7.mongodb.net/test?retryWrites=true&w=majority",
    secretOrKey: "secret"
};




// "mongodb+srv://test:<password>@cluster0-04dq7.mongodb.net/test?retryWrites=true&w=majority"


// const MongoClient = require(‘mongodb’).MongoClient;
// const uri = "mongodb+srv://test:<password>@cluster0-04dq7.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });