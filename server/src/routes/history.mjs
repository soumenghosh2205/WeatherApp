import express from 'express'
import { createSearchedCity, getSearchedCities, getSearchedCity } from '../repository/history.mjs'

const router = express.Router()

router.post('/search', async (req, res) => {
  const response = await getSearchedCities(req.body.username)
  const results = response.map((r) => ({
    abbr: r.abbr,
    name: r.name,
    capital: r.capital,
    lat: r.lat,
    long: r.long
  }))

  res.send(results).status(200)
});

router.post('/', async (req, res) => {
  const { username, city } = req.body

  if (!username || !city.abbr || !city.name || !city.capital || !city.lat || !city.long) {
    res.send([]).status(400)
  }
  else {
    const existingRecord = await getSearchedCity(username, city.lat, city.long)

    if (!existingRecord) {
      const results = await createSearchedCity(username, city.abbr, city.name, city.capital, city.lat, city.long)
      res.send(results).status(200)
    }
    else {
      res.send({}).status(409)
    }
  }
})

export default router

