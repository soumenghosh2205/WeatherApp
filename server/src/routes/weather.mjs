import express from 'express'
import axios from 'axios';

const router = express.Router()
const weatherApi = process.env.WEATHER_API
const airQualityApi = process.env.AIR_QUALITY_API

const mapWeatherData = (forecastData, airQualityData) => {

  const hourlyTemperature = forecastData.hourly.time.map((time, index) => {
    const temperature = forecastData.hourly.temperature_2m[index]
    const airQuality = airQualityData.hourly.us_aqi[index]
    return { time, temperature, airQuality }
  })

  const dailyTemperature = forecastData.daily.time.map((time, index) => {
    const maxTemp = forecastData.daily.temperature_2m_max[index]
    const minTemp = forecastData.daily.temperature_2m_min[index]
    const precipitationProbabilityMax = forecastData.daily.precipitation_probability_max[index]
    return { time, maxTemp, minTemp, precipitationProbabilityMax}
  })

  return {
    latitude: forecastData.latitude,
    longitude: forecastData.longitude,
    hourlyTemperature,
    dailyTemperature
  }
}

router.post('/', async (req, res) => {
  const { lat, long } = req.body

  const forecastResponse = await axios.get(`${weatherApi}?latitude=${lat}&longitude=${long}&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&timezone=auto`)
  const airQualityResponse = await axios.get(`${airQualityApi}?latitude=${lat}&longitude=${long}&hourly=us_aqi`)
  const data = mapWeatherData(forecastResponse.data, airQualityResponse.data)
  res.send(data).status(200)
});

router.get('/', async (req, res) => {
  res.send('Send a city name').status(200)
})

export default router

