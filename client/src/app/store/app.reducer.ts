import { createReducer, on } from '@ngrx/store';
import { City } from '../models/city.model';
import { WeatherData } from '../models/weather.model';
import { getAllCitiesFail, getAllCitiesSuccess, getSearchedCitiesFail, getSearchedCitiesSuccess, getWeatherDataFail, getWeatherDataSuccess, setSelectedCity, setUsername } from './app.actions';

export interface AppState {
  username: string,
  cities: City[],
  selectedCity: City,
  searchedCities: City[],
  weatherData: WeatherData
}

export const initialState: AppState = {
  username: '',
  cities: [],
  selectedCity: { abbr: '', name: '', capital: '', lat: '', long: '' },
  searchedCities: [],
  weatherData: { latitude: 0, longitude: 0, hourlyTemperature: [], dailyTemperature: [] }
}

export const appReducer = createReducer(
  initialState,
  on(setUsername, (state, { username }) => ({ ...state, username: username })),

  on(setSelectedCity, (state, { selectedCity }) => ({ ...state, selectedCity })),

  on(getAllCitiesSuccess, (state, { cities }) => ({ ...state, cities })),
  on(getAllCitiesFail, (state) => ({ ...state, cities: [] })),

  on(getSearchedCitiesSuccess, (state, { searchedCities }) => ({ ...state, searchedCities })),
  on(getSearchedCitiesFail, (state) => ({ ...state, searchedCities: [] })),

  on(getWeatherDataSuccess, (state, { weatherData }) => ({ ...state, weatherData })),
  on(getWeatherDataFail, (state) => ({ ...state }))
)
