const express = require('express');
const app = express();
const weatherInfoRouter = require('./routes/weatherInfo')
require('dotenv').config()
const CORs = require('cors')
const axios = require('axios')

app.use(CORs())
app.use(express.static('public'))
app.use(express.json()) //expect that every request potentially have JSON. All routes, just parse the body expecting it to be JSON. //just parses when it has data from req
//remember to put middlewares first. 
app.use(express.static('./public')) //the connection issue b/w the index.html and index.js files was the missing slash before the word static

app.use('/weatherInfo', weatherInfoRouter)

app.get('/', function(req, res) {
    res.send('Hello World!')
    // axios.post('/weatherInfo', {location: "Paris, France"})
    // .then(res => {
    //     res.json()
    // })
    // .catch(error => {
    //     res.json({message: error.message} || error)
    // })

})


const port = 4000

app.listen(port, () => { //use 4000 for backend and 3000 for frontend.
    console.log(`Listening on port ${port}`)
    console.log(`CORs-enabled webserver running on port ${port}`)
}) 