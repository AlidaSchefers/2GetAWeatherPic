const router = require('express').Router()
const axios = require('axios')
const express = require('express')

router.use(express.json())
// require('dotenv').config()

const weatherEndpoint = 'http://api.openweathermap.org/data/2.5/weather'
const weatherAPIKey = 'f4b889d04e3361b59b0cb318a09872b8'
console.log(weatherAPIKey)
router.post('/', async(req, res, next) => {
    try {
        const endpoint = `${weatherEndpoint}?q=${req.body.location}&appid=${weatherAPIKey}`
        const {data} = axios.get(endpoint)
        const usefulData = {
            weatherId: data.weather[0].id,
            mainWeather: data.weather[0].main,
            weatherDesc: data.weather[0].description,
            kelvinTemp: data.main.temp,
            secondsTimezoneOffset: data.timezone
        }
        res.json(usefulData)
        res.json(data)
        // res.send(data)
    } catch (error) {
        res.status(500).json({message: error.message || error})
    }
    next()
})

module.exports = router