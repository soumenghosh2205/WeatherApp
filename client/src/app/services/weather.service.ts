import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'environment'
import { WeatherData } from '../models/weather.model'

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) { }

  getweatherData(lat: string, long: string): Observable<WeatherData> {
    return this.http.post<WeatherData>(`${environment.apiUrl}/weather`, { lat, long })
  }
}
