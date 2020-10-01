import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { WeatherForecastService } from './services/weather-forecast.service';
import { UserWeatherForecastService } from './services/user-weather-forecast.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddNewCityComponent } from './components/add-new-city/add-new-city.component';
import { CityWeatherForecastComponent } from './components/city-weather-forecast/city-weather-forecast.component';
import { UserWeatherForecastComponent } from './components/user-weather-forecast/user-weather-forecast.component';
import { LoginComponent } from './components/login/login.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CityNamePipe } from './utils/cityNamePipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserWeatherForecastComponent,
    AddNewCityComponent,
    CityWeatherForecastComponent,
    CityNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'hu-HU',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [LoginService, UserWeatherForecastService, WeatherForecastService, CityNamePipe],
  bootstrap: [AppComponent],
  entryComponents: [AddNewCityComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
