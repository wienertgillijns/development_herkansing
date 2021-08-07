const express = require('express')
const app = express()
const port = 3000
const postCategorie = require('./modules/postCategorie')
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
var mongo = require('mongodb');




app.post('/categorie', async (req, response) => {

    response.send(await postCategorie(req.body));
})

app.get('/categorie/all', async (req, response) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://admin:admin@cluster0.dfwwe.mongodb.net/Herkansing?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Herkansing");
    dbo.collection("Categories").find({}).toArray(async function(err, result) {
        if(err) throw err;
        for(const row of result) {
            
            const logs  = await dbo.collection("Logs").find({categorieId  : row._id.toString() }).toArray() 
            row.logs = logs

        }
        response.send(result);
    })
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

app.get('/logs/all', (req, response) => {
    var MongoClient = require('mongodb').MongoClient;
    var ObjectId = require('mongodb').ObjectID;
    var url = "mongodb+srv://admin:admin@cluster0.dfwwe.mongodb.net/Herkansing?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Herkansing");
    dbo.collection("Logs").find({}).toArray(function(err, result) {
        if (err) throw err;
        dbo.collection("Categories").find({}).toArray(function(err, result2) {
            for(const row of result) {
                row.categorie = result2.find(x => x._id = row.categorieId);  
                delete row.categorieId 
            }
            response.send(result);
        })
       // db.close();
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

    dbo.collection("Categories").find({}).toArray(function(err, result2) {

        dbo.collection("Logs").find(query).toArray(function(err, result) {
            if (err) throw err;
            for(const row of result) {
                row.categorie = result2.find(x => x._id = query.categorieId);
                delete row.categorieId 
            }
            response.send(result);
            db.close();
        });
    })

        });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
module.exports = app
