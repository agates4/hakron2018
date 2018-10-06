const express = require("express");
var weather = require('openweather-apis');
weather.setLang('English');
weather.setCity('Akron');
weather.setUnits('imperial');
weather.setAPPID('b9dec2e21bf0037bcc50439b8b70cf19')


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
    weather.getWeatherForecastForDays(3, function(err, obj){
		console.log(obj);
	});
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
