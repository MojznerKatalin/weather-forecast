import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { USER_CITIES } from '../constants';
import { WeatherForecastService } from './weather-forecast.service';

@Injectable({
  providedIn: 'root'
})
export class UserWeatherForecastService {

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private wheaterForecastService: WeatherForecastService
  ) { }

  loadUserCities(userName: string): Array<string> {

    const key = userName + USER_CITIES;

    return !!this.storage.get(key) ? JSON.parse(this.storage.get(key)) : null;
  }

  addNewCity(userName: string, city: string) {

    let userCities = this.loadUserCities(userName);
    if (!!userCities) {
      if (!!userCities.includes(city)) {
        console.log('Existing city!');
      } else {
        userCities.push(city);
      }
    } else { userCities = [city]; }

    this.storage.set(userName + USER_CITIES, JSON.stringify(userCities));
  }

  removeCity(userName: string, city: string) {
    const userCities = this.loadUserCities(userName);
    userCities.splice(userCities.indexOf(city), 1);
    this.storage.set(userName + USER_CITIES, JSON.stringify(userCities));

  }

  loadCurrentweatherData(city: string) {
    return this.wheaterForecastService.loadCurrentweatherData(city);
  }
}
