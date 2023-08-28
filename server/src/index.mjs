import express from 'express'
import cors from 'cors'
import './loadEnvironment.mjs'
import cities from './routes/cities.mjs'
import history from './routes/history.mjs'
import weather from './routes/weather.mjs'

const PORT = process.env.PORT || 4000

const app = express()

app.use(cors())
app.use(express.json())

app.use('/cities', cities)

app.use('/history', history)

app.use('/weather', weather)

app.use((err, _req, res, next) => {
    console.error(err)
    res.status(500).send('Uh oh! An unexpected error occured.')
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

