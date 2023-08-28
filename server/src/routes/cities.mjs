import express from 'express'
import { getAllCities } from '../repository/city.mjs'

const router = express.Router()

router.get('/', async (req, res) => {
  const results = await getAllCities();
  res.send(results).status(200)
});

export default router

