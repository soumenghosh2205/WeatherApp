import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { City } from 'src/app/models/city.model'
import { HourlyTemperature, WeatherData } from 'src/app/models/weather.model'
import { selectSelectedCity, selectWeatherData } from 'src/app/store/app.selectors'

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private store: Store) { }

  selectedCity$: Observable<City> = this.store.select(selectSelectedCity)
  weatherData$: Observable<WeatherData> = this.store.select(selectWeatherData)
  todayTempMinMax: { min: number, max: number } = { min: 0, max: 0 }
  hourlyData: HourlyTemperature[] = []
  dailyData: { day: string, minTemp: number, maxTemp: number, precipitationProbabilityMax: number }[] = []

  ngOnInit(): void {
    this.weatherData$.subscribe((weatherData) => {
      this.calculateWeatherData(weatherData)
    })
  }

  calculateWeatherData(weatherData: WeatherData): void {
    const todaysData = weatherData.hourlyTemperature.filter(d => new Date(d.time).getDate() === new Date().getDate())

    var todayTemps = todaysData.map(x => x.temperature)
    this.todayTempMinMax = {
      max: Math.max(...todayTemps),
      min: Math.min(...todayTemps)
    }

    this.hourlyData = todaysData
      .map(m => ({
        ...m,
        time: new Date(m.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }))

    this.dailyData = weatherData.dailyTemperature
      .map(m => ({
        ...m,
        day: new Date(m.time).toLocaleDateString([], { weekday: 'short' })
      }))
  }
}
