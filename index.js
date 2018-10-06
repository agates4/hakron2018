const express = require('express')
var app = express.createServer();

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(8080, '127.0.0.1')