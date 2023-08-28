import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'environment'
import { City } from '../models/city.model'

@Injectable()
export class CityService {
  constructor(private http: HttpClient) { }

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(`${environment.apiUrl}/cities`)
  }
}
