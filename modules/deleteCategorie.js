module.exports = (name) => {
    return new Promise((resolve,reject) => {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb+srv://admin:admin@cluster0.dfwwe.mongodb.net/Herkansing?retryWrites=true&w=majority";
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Herkansing");
            const myobj = {name : name};
            dbo.collection("Categories").deleteMany(myobj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
                resolve(myobj)
            });
            });
        
    })
    
}