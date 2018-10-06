const express = require("express");

const app = express()

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/help1', (req, res) => {
    console.log(req)
})

app.listen(80, () => {
    // console.log('http://localhost:5656')
})