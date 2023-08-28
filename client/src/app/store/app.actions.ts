import { createAction, props } from '@ngrx/store'
import { City } from '../models/city.model'
import { SearchedCity } from '../models/history.model'
import { WeatherData } from '../models/weather.model'

export const checkUsername = createAction('[App] Check username valid')

export const getUsername = createAction('[App] Get Username')
export const setUsername = createAction('[App] Set Username', props<{ username: string }>())

export const getSelectedCity = createAction('[App] Get selected city')
export const setSelectedCity = createAction('[App] Set selected city', props<{ selectedCity: City }>())

export const getAllCities = createAction('[App] Get all cities')
export const getAllCitiesSuccess = createAction('[App] Get all cities success', props<{ cities: City[] }>())
export const getAllCitiesFail = createAction('[App] Get all cities fail')

export const getSearchedCities = createAction('[App] Get search cities')
export const getSearchedCitiesSuccess = createAction('[App] Set search cities success', props<{ searchedCities: City[] }>())
export const getSearchedCitiesFail = createAction('[App] Set search cities fail')

export const createSearchedCity = createAction('[App] Create search history', props<{ searchedCity: SearchedCity }>())
export const createSearchedCitySuccess = createAction('[App] Create search history success', props<{ searchedCity: SearchedCity }>())
export const createSearchedCityFail = createAction('[App] Create search history fail')

export const getWeatherDataSuccess = createAction('[App] Get weather data success', props<{ weatherData: WeatherData }>())
export const getWeatherDataFail = createAction('[App] Get weather data fail')
