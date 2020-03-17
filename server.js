const express = require('express');
const bodyparser = require('body-parser');
const axios = require('axios');
const fetch = require('node-fetch');   

const app = express();

//access all the static files in the public folder
app.use(express.static('public'));

const port = 3001;
const apiKey = 'ad3fa995d613cd69122cfffc24bc1222';

app.use(bodyparser.urlencoded({ extended: true })); 
app.use(bodyparser.json());



app.get('/test', (req, res) => {
    console.log("the server is running as expected")
    res.status(200).send({message: "server is connected and ready for action"})
})

// app.get('/customers', (req, res) => {
//     console.log("opening the page");

//     const data = [
//         {id: 1, name: "dbaigs"},
//         {id: 2, name: "mbaigs"}
//     ]
//     res.status(200).json(data);
// })

app.post('/radius', (req, res) => {
    console.log("receiving data");
    console.log(`received: ${JSON.stringify(req.body)}`);
    //use radius as variable for api call to get data and return that data
    
    res.send({radius: req.body["radius"]});
    //res.render('index', {radius: req.body["radius"]});
    
})

app.post('/weather', function(req,res){
    let city = req.body["location"];
    console.log(`city input is: ${city}`)
  	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
	

    
    // fetch(url, {
    //     method: 'GET',
    //     // body: JSON.stringify(req.body),
    //     // headers: {"Content-Type": "application/json"}
    // })
    axios.post(url)
	.then(response => response)
	.then(data => {		
        console.log(data.data)
        res.status(200).send({weather: data.data})
	    
	})
    .catch(error => {
        console.log(error)
        res.send({weather: 'Error, please try again'})
    });


});

app.listen(port, () => console.log(`server started on port: ${port}`))