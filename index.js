const express = require("express");
var weather = require("openweather-node")
var dateFormat = require('dateformat');
var request = require('request');

const app = express()

app.use(express.json());

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/bus', (req, res) => {
    const bus = ["Route 101,\n"]
    const closestTerminal = ["BUS STOP: UA Arts and sciences,\n"]
    const arrival = ["Arrival: 10 minutes"]
    
    res.send(
        {
            "response": 
            bus [0] + " " + closestTerminal [0] + " " + arrival[0] + " " + "\n"
        }
    )
})

app.post('/weather', (req, res) => {
    console.log(req.body)
    weather.setAPPID('272962de1269f77934c7e7c37e4a915c')
    weather.setForecastType("daily");
    weather.setCulture('en')

    formattedResponse = ""

    weather.now("Akron", function(err, data) {	
        if(err) console.log(err);
        else {
            sunrise = data.values.sys.sunrise * 1000
            var sunrise = new Date(sunrise)
            sunrise.setHours(sunrise.getHours() - 4);
            var formattedSunrise = dateFormat(sunrise, "h:MM TT");

            sunset = data.values.sys.sunset * 1000
            var sunset = new Date(sunset)
            sunset.setHours(sunset.getHours() - 4);
            var formattedSunset = dateFormat(sunset, "h:MM TT");

            formattedResponse = "The sun will rise at " + formattedSunrise
            + " and set at " + formattedSunset + ". "
        }

        request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url:     'http://api.openweathermap.org/data/2.5/forecast?q=Akron&units=imperial&appid=272962de1269f77934c7e7c37e4a915c&cnt=20',
            body:    "mes=heydude"
        }, function(error, response, body){
            weatherResponse = JSON.parse(body)
    
            currentDay = false
            insertDay = false
            prevDescription = ""
            for (let index = 0; index < weatherResponse.cnt; index++) {
                const element = weatherResponse.list[index];

                if(prevDescription != element.weather[0].description) {
                    prevDescription = element.weather[0].description
                }
                else {
                    continue
                }

                date = element.dt * 1000
                var date = new Date(date)
                date.setHours(date.getHours() - 4);

                compareDay = dateFormat(date, "mmm dd");
                if(currentDay != compareDay) {
                    currentDay = dateFormat(date, "mmm dd");
                    insertDay = true
                } else insertDay = false

                insertString = ""
                if(insertDay)
                    insertString = "On " + currentDay + ":\n"

                var formattedDate = dateFormat(date, "h:MM TT");
                formattedResponse += insertString + "\n" + "There will be " + element.weather[0].description + " at " + formattedDate
            }

            res.send(
                {
                    "response": formattedResponse
                }
            )
        });
    })
})

app.post('/addiction', (req, res) => {
    request.get({
        headers: {'zipCode' : 'application/x-www-form-urlencoded'},
        url:     'https://www.zipcodeapi.com/rest/GOhazMBKVJ2VDSEOrrkf0sswW4D5c4NYOjZi2mGTjf2wuvgvTkUj5L1KpR2GkRRI/info.json/zip_code/degrees'
    }, function(error, response, body){
        data = JSON.parse(body)

        console.log(data)
    })
    
    const placeName = ["#1 Salvation Army,", "#2 Summa Rehab,", "#3 IBH Addiction Recovery Center,"]
    const hours = ["HOURS: 9am - 7pm,", "Open all day,", "HOURS: 8am - 6pm,"]
    const address = ["1006 Grant St, Akron, OH,", "29 N Adams St, Akron, OH,", "3445 S Main St, Akron, OH,"]
    const distance = ["1.5 miles from Akron University Law Building", "2.2 miles from Akron University Law Building", "5.3 miles from Akron University Law Building"]

    console.log(req.body)
    res.send({
        "response": placeName[0] + " " + hours[0] + " " + address[0] + " " + distance[0] + "\n" +
            placeName[1] + " " + hours[1] + " " + address[1] + " " + distance[1] + "\n" +
            placeName[2] + " " + hours[2] + " " + address[2] + " " + distance[2] + "\n"
    })
})

app.listen(80, () => {
    // console.log('http://localhost:5656')
})
