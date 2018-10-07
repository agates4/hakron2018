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

    weather.now("Akron", function(err, data) {	
        if(err) console.log(err);
        else {
            sunrise = data.values.sys.sunrise + " EST"
            var sunrise = new Date(sunrise*1000);
            var hours1 = sunrise.getHours();
            var minutes1 = "0" + sunrise.getMinutes();
            var seconds1 = "0" + sunrise.getSeconds();
            var formattedSunrise = hours1 + ':' + minutes1.substr(-2)

            sunset = data.values.sys.sunset + " EST"
            var sunset = new Date(sunset*1000);
            var hours1 = sunset.getHours();
            var minutes1 = "0" + sunset.getMinutes();
            var seconds1 = "0" + sunset.getSeconds();
            var formattedSunset = hours1 + ':' + minutes1.substr(-2)

            console.log(formattedSunrise, formattedSunset)
        }
    })
    
    res.send(
        {
            "response": "weather"
        }
    )
})

app.post('/addiction', (req, res) => {
    console.log(req.body)
    res.send(
        {
            "response": "addiction"
        }
    )
})

app.listen(80, () => {
    // console.log('http://localhost:5656')
})
