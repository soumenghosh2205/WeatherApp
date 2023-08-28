export interface WeatherData {
  latitude: number,
  longitude: number,
  hourlyTemperature: HourlyTemperature[]
  dailyTemperature: DailyTemperature[]
}

export interface HourlyTemperature {
  time: string,
  temperature: number,
  airQuality: number
}

export interface DailyTemperature {
  time: string,
  maxTemp: number,
  minTemp: number,
  precipitationProbabilityMax: number
}
