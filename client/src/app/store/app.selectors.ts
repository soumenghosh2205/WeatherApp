import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.reducer";

const selectAppState = createFeatureSelector<AppState>('app-state');

export const selectUserName = createSelector(selectAppState, (state) => state.username)
export const selectSelectedCity = createSelector(selectAppState, (state) => state.selectedCity)
export const selectAllCities = createSelector(selectAppState, (state)=> state.cities)
export const selectSearchedCities = createSelector(selectAppState, (state)=> state.searchedCities)
export const selectWeatherData = createSelector(selectAppState, (state)=> state.weatherData)
