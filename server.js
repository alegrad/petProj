var express = require("express"),
    fs = require('fs'),
    port = process.env.PORT || 2595;

var app = express();
//app.use(express.logger());
//app.use(express.json());
//app.use(express.urlencoded());
/*app.set("view options", {
    layout: false
});*/
app.use(express.static(__dirname + '/app'));

app.get('/', function (req, res) {
    /*var movies = require('./app/books.json');
    res.json(movies);*/
    res.render('app/index.html');
});
app.get('/books', function (req, res) {
    var books = require('./app/books.json');
    res.json(books);

});
app.get('/books/:id', function (req, res) {
    var books = require('./app/books.json');
    res.json(books);
});

app.listen(port);
console.log('Express server  running at http://localhost:' + port);
