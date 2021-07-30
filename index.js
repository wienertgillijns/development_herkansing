const express = require('express')
const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));





app.post('/categorie', (req, response) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://admin:admin@cluster0.dfwwe.mongodb.net/Herkansing?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Herkansing");
    var myobj = req.body
    dbo.collection("Categories").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
        response.send(myobj)
        
    });
    });
})

app.post('/logs', (req, response) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://admin:admin@cluster0.dfwwe.mongodb.net/Herkansing?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Herkansing");
    var myobj = req.body
    dbo.collection("Logs").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
        response.send(myobj)
        
    });
    });
})

app.get('/logs', (req, response) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://admin:admin@cluster0.dfwwe.mongodb.net/Herkansing?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Herkansing");
    
    var query = { categorieId: req.query.categorieId };
    dbo.collection("Logs").find(query).toArray(function(err, result) {
        if (err) throw err;
        response.send(result);
        db.close();
    });
        });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
