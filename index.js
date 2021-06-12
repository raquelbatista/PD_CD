const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://raquel_batista98:raquel123@clusterpd.lrwyf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient (uri, { useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: true }));

client.connect(err => {
  db = client.db("mongodb").collection("cds");
  app.listen(8090, function(){
	console.log("Servidor em execução na porta 8090");
});
  // perform actions on the collection object
});

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
	res.render('template.ejs');
	const cursor = db.find();
});

app.post('/show', (req, res) => {
    db.insertOne(req.body, (err, result) => {
        if (err) return console.log("Erro: " + err);
 
        console.log("Registo guardado com sucesso na BD!");
        res.redirect('/');
        db.find().toArray((err, results) => {
        	console.log(results);
        });
    });
});

app.get('/show', (req, res) => {
    db.find().toArray((err, results) => {
        if (err) return console.log("Error: "+ err);
        res.render('show.ejs', { cds: results });
    });
});

var ObjectId = require('mongodb').ObjectID;//EDIT
app.route('/edit/:id')
.get((req,res) => {
    var id = req.params.id;db.find(ObjectId(id)).toArray((err, result) => {
        if (err) return console.log("Error: " + err);
     res.render('edit.ejs', { cds: result });
    });
})
.post((req,res) => {
    var id = req.params.id;
    var title = req.body.title;
    var artist= req.body.artist;
    var genre = req.body.genre;db.updateOne({_id: ObjectId(id)}, {
        $set: {
     title: title,
     artist: artist,
     genre: genre    
 }
    }, (err, result) => {
     if (err) return res.send(err);
        res.redirect('/show');
 console.log("Successfully Updated!");
    })
});


//DELETE
app.route('/delete/:id')
.get((req,res) => {
    var id = req.params.id;db.deleteOne({_id: ObjectId(id)}, (err, result) => {
     if (err) return res.send(500, err);
 console.log("Registo eliminado com sucesso!");
 res.redirect('/show');
    });
});

