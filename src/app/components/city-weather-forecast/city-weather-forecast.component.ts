import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataItem, Series } from '@swimlane/ngx-charts';
import { CurrentWeather } from 'src/app/model/currentWeather';
import { FiveDayForecast } from 'src/app/model/fiveDayForecast';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';
import { CityNamePipe } from 'src/app/utils/cityNamePipe';


@Component({
  selector: 'app-city-weather-forecast',
  templateUrl: './city-weather-forecast.component.html',
  styleUrls: ['./city-weather-forecast.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CityWeatherForecastComponent implements OnInit {

  @Input() city: string;
  temperature: number;
  humidity: number;
  airPressure: number;
  windDeg: string;
  windSpeed: string;
  currentWeather: CurrentWeather;
  fiveDayForecast: FiveDayForecast;
  forecastData = new Array<Series>();
  dataItem = new Array<DataItem>();

  view: any[] = [700, 500];
  colorScheme = {
    domain: ['#673ab7']
  };
  legend = true;
  legendTitle = '';
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  timeline = false;
  autoScale = true;

  constructor(
    private wheaterForecastService: WeatherForecastService,
    private translateService: TranslateService,
    private cityName: CityNamePipe
  ) { }

  ngOnInit(): void {
    this.loadweatherData();
  }

  loadweatherData() {

    this.wheaterForecastService.loadCurrentweatherData(this.city).subscribe((current: CurrentWeather) => {
      this.currentWeather = current;

      this.temperature = this.currentWeather.main.temp;
      this.humidity = this.currentWeather.main.humidity;
      this.airPressure = this.currentWeather.main.pressure;
      this.windDeg = this.convertWindDeg(this.currentWeather.wind.deg);
      this.windSpeed = (this.currentWeather.wind.speed * 3.6).toFixed(2);

    },
      error => {
        console.log(error.error.message);
      }
    );

    this.wheaterForecastService.loadWeatherForecast(this.city).subscribe((forecast: FiveDayForecast) => {

      forecast.list.forEach(element => {
        this.dataItem.push(
          {
            name: element.dt_txt,
            value: element.main.temp,
            extra: {
              tooltip: element.dt_txt +
                ': ' +
                element.main.temp +
                ' '
                + this.translateService.instant('cityWeatherForecast.metric.celsius')
            }
          });
      });

      this.forecastData.push({ name: this.cityName.transform(forecast.city.name), series: this.dataItem });
      // Because of a swimlane anchorPos bug
      this.forecastData = JSON.parse(JSON.stringify(this.forecastData));
    },
      error => {
        console.log(error.error.message);
      }
    );
  }

  convertWindDeg(windDeg: number): string {
    let degree: string;

    if ((windDeg >= 348.75 && windDeg <= 360) || (windDeg >= 0 && windDeg < 11.25)) { degree = 'N'; } else if
      (windDeg >= 11.25 && windDeg < 33.75) { degree = 'NNE'; } else if
      (windDeg >= 33.75 && windDeg < 56.25) { degree = 'NE'; } else if
      (windDeg >= 56.25 && windDeg < 78.75) { degree = 'ENE'; } else if
      (windDeg >= 78.75 && windDeg < 101.25) { degree = 'E'; } else if
      (windDeg >= 101.25 && windDeg < 123.75) { degree = 'ESE'; } else if
      (windDeg >= 123.75 && windDeg < 146.25) { degree = 'SE'; } else if
      (windDeg >= 146.25 && windDeg < 168.75) { degree = 'SSE'; } else if
      (windDeg >= 168.75 && windDeg < 191.25) { degree = 'S'; } else if
      (windDeg >= 191.25 && windDeg < 213.75) { degree = 'SSW'; } else if
      (windDeg >= 213.75 && windDeg < 236.25) { degree = 'SW'; } else if
      (windDeg >= 236.25 && windDeg < 258.75) { degree = 'WSW'; } else if
      (windDeg >= 258.75 && windDeg < 281.25) { degree = 'W'; } else if
      (windDeg >= 281.25 && windDeg < 303.75) { degree = 'WNW'; } else if
      (windDeg >= 303.75 && windDeg < 326.25) { degree = 'NW'; } else if
      (windDeg >= 326.25 && windDeg < 348.75) { degree = 'NNW'; }

    return this.translateService.instant('cityWeatherForecast.' + degree);
  }
}
