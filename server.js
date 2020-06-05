const express = require('express');
const app = express();
const mongo = require('mongodb').MongoClient;
//const db_pword="test123";
//const db_name="guesswho";
//const dburl = `mongodb+srv://user1:${db_pword}@arpcluster-ptido.azure.mongodb.net/${db_name}?retryWrites=true&w=majority`;
const dburl = process.env.MONGODB_URI;
var port = process.env.PORT || 8000;

app.use(express.static(__dirname+'/static'));
app.use(express.json());
app.use(express.text());

mongo.connect(dburl, {useUnifiedTopology:true}, function(error, client) {
    const db = client.db();
    
    app.get('/getCollections', function(req, res) {
        var allCollections = [];
        db.listCollections().toArray(function(err, cols) {
            for (c in cols) {
                allCollections.push({"collection": cols[c].name});
            }
            res.send(allCollections);
        })
    })
    //Name of newly created collection
    var collectionName;

    //Variable for the selected collection to be used
    var thisCol;
    
    //Post route to create a new collection for a new game board
    app.post('/collection', function(req, res) {
        //New collection is created
        var newCollection = db.createCollection(req.body);
        //The name of the new collection as a string to pass to the data post
        collectionName = req.body;
    })

    //Post route to add the data to the new collection
    app.post('/data', function(req, res) {
        console.log(req.body);
        //Use this collection
        thisCol = db.collection(collectionName);
        thisCol.insertMany(req.body);
        
        //Send this collection's name and image links data to be used in the game play
        app.get('/newgamedata', function(req, res) {
            thisCol.find().toArray(function(err, items) {
                console.log(items);
                res.send(items);
            })
        })

    })
    var chosenCollection;
    app.post('/chosengame', function(req, res) {
        //Get the name of the game(collection) clicked 
        chosenCollection = db.collection(req.body);
        //Play the chosen game.  Send that name and image links data for the chosen game board
        app.get('/getgamedata', function(req, res) {
            chosenCollection.find().toArray(function(err, items) {
                res.send(items);
            })
        })
    })
    var updateCollection;
    app.post('/update', function(req, res) {
        updateCollection = db.collection(req.body);
        app.get('/getupdates', function(req, res) {
            updateCollection.find().toArray(function(err, items) {
                res.send(items);
            })
        })
    })

    app.post('/updateDb', function(req, res) {
        var updates = req.body;
        updateCollection = db.collection(updates.collection);
        var original = {name: updates.originalName};
        var updateValues = {$set: {name: updates.name, image: updates.image, posX: updates.posX, posY: updates.posY}};
        updateCollection.updateOne(original, updateValues, function(err, res) {
            console.log('update with ' + updateValues);
        })
        console.log(req.body);
    })
    
})

var server = app.listen(port);