import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, exhaustMap, withLatestFrom, of, catchError, tap } from 'rxjs'
import { CityService } from '../services/cities.service';
import { HistoryService } from '../services/history.service'
import { WeatherService } from '../services/weather.service';
import {
  getAllCities,
  getAllCitiesSuccess,
  getAllCitiesFail,
  getSearchedCities,
  getSearchedCitiesSuccess,
  getSearchedCitiesFail,
  setUsername,
  getWeatherDataSuccess,
  getWeatherDataFail,
  createSearchedCity,
  createSearchedCityFail,
  setSelectedCity,
  checkUsername
} from './app.actions'
import { selectSelectedCity, selectUserName } from './app.selectors'

@Injectable()
export class AppEffects {

  checkUsername$ = createEffect(() => this.actions$.pipe(
    ofType(checkUsername),
    withLatestFrom(this.store.select(selectUserName)),
    tap(([, username]) => {
      if (!username) {
        this.router.navigateByUrl('/')
      }
    })
  ), { dispatch: false })

  setUsername$ = createEffect(() => this.actions$.pipe(
    ofType(setUsername),
    map(() => this.router.navigateByUrl('/dashboard'))
  ), { dispatch: false })

  getAllCities$ = createEffect(() => this.actions$.pipe(
    ofType(getAllCities),
    exhaustMap(() => this.cityService.getAllCities()
      .pipe(
        map(results => getAllCitiesSuccess({ cities: results }))
      )
    ),
    catchError(() => of(getAllCitiesFail))
  ))

  getSearchedCities$ = createEffect(() => this.actions$.pipe(
    ofType(getSearchedCities),
    withLatestFrom(this.store.select(selectUserName)),
    exhaustMap(([, username]) => this.historyService.getSearchedCities(username)
      .pipe(
        map(results => getSearchedCitiesSuccess({ searchedCities: results }))
      )
    ),
    catchError(() => of(getSearchedCitiesFail))
  ))

  createSearchedCity$ = createEffect(() => this.actions$.pipe(
    ofType(createSearchedCity),
    exhaustMap(({ searchedCity }) => this.historyService.createSearchedCity(searchedCity)
      .pipe(
        map(() => getSearchedCities())
      )
    ),
    catchError(() => of(createSearchedCityFail))
  ))

  getWeatherData$ = createEffect(() => this.actions$.pipe(
    ofType(setSelectedCity),
    withLatestFrom(this.store.select(selectSelectedCity)),
    exhaustMap(([, { lat, long }]) => this.weatherService.getweatherData(lat, long)
      .pipe(
        map(results => getWeatherDataSuccess({ weatherData: results }))
      )
    ),
    catchError(() => of(getWeatherDataFail))
  ))

  getWeatherDataSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(getWeatherDataSuccess),
    withLatestFrom(this.store.select(selectUserName), this.store.select(selectSelectedCity)),
    map(([, username, selectedCity]) => createSearchedCity({
      searchedCity: {
        username,
        city: selectedCity
      }
    }))
  ))

  constructor(
    private actions$: Actions,
    private store: Store,
    private router: Router,
    private cityService: CityService,
    private historyService: HistoryService,
    private weatherService: WeatherService
  ) { }
}
