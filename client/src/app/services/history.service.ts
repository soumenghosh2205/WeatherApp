import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CreatedSearchedCity, SearchedCity } from '../models/history.model'
import { environment } from 'environment'
import { City } from '../models/city.model'

@Injectable()
export class HistoryService {
  constructor(private http: HttpClient) { }

  getSearchedCities(username: string): Observable<City[]> {
    return this.http.post<City[]>(`${environment.apiUrl}/history/search`, { username })
  }

  createSearchedCity(searchedCity: SearchedCity): Observable<CreatedSearchedCity> {
    return this.http.post<CreatedSearchedCity>(`${environment.apiUrl}/history`, { ...searchedCity })
  }
}
