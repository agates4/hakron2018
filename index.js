const express = require("express");
var weather = require("openweather-node")

const app = express()

app.use(express.json());

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/bus', (req, res) => {
    console.log(req.body)
    res.send(
        {
            "response": "bus"
        }
    )
})

app.post('/weather', (req, res) => {
    console.log(req.body)
    weather.setAPPID('272962de1269f77934c7e7c37e4a915c')
    weather.setCulture('en')

    weather.now("Akron", function(err, aData) {	
        if(err) console.log(err);``
        else
        {
            console.log(aData)
        }
    })
    
    res.send(
        {
            "response": "weather"
        }
    )
})
app.post('/addiction', (req, res) => {
    const placeName = ["ad1", "ad2", "ad3"]
    const hours = ["hours1", "hours2", "hours3"]
    const distance = ["miles1", "miles2", "miles3"]

    console.log(req.body)
    res.send({
        "response": placeName[0] + " " + hours[0] + " " + distance[0] + "\n" +
            placeName[1] + " " + hours[1] + " " + distance[1] + "\n" +
            placeName[2] + " " + hours[2] + " " + distance[2] + "\n" 


    })
})

app.listen(80, () => {
    // console.log('http://localhost:5656')
})
