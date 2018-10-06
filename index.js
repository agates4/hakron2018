const express = require('express')
const app = express()
const port = 3000

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  response.send('Hello from Express!')
  response.render('index.html');
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

