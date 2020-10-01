import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_KEY } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  constructor(
    private httpClient: HttpClient
  ) { }

  loadCurrentweatherData(city: string) {
    return this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  }

  loadWeatherForecast(city: string) {
    return this.httpClient.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
  }
}
