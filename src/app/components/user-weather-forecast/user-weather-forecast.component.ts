import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddNewCityComponent } from '../add-new-city/add-new-city.component';
import { UserWeatherForecastService } from 'src/app/services/user-weather-forecast.service';
import { CityNamePipe } from 'src/app/utils/cityNamePipe';

@Component({
  selector: 'app-user-weather-forecast',
  templateUrl: './user-weather-forecast.component.html',
  styleUrls: ['./user-weather-forecast.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserWeatherForecastComponent implements OnInit {

  user: string;
  isUserLoggedIn: boolean;
  userCities: Array<string>;
  newCity: string;
  selectedIndex: number;

  constructor(
    private translateService: TranslateService,
    private userweatherForecastService: UserWeatherForecastService,
    private dialog: MatDialog,
    private cityName: CityNamePipe
  ) { }

  ngOnInit(): void {
    this.selectedIndex = 0;
    this.isUserLoggedIn = false;
  }

  addNewCity() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddNewCityComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (!!data) {
          const caseInSensitiveCity = data.toUpperCase();

          this.userweatherForecastService.loadCurrentweatherData(caseInSensitiveCity).subscribe(cityData => {
            this.userweatherForecastService.addNewCity(this.user, caseInSensitiveCity);
            this.userCities = this.userweatherForecastService.loadUserCities(this.user);

            // These setTimeout blocks are necessary because of a bug of selectedIndex property and
            // because of tabs refreshing time in mat-tab-group
            // This way can focus on the proper tab

            setTimeout(() => {
              if (this.selectedIndex === this.userCities.indexOf(caseInSensitiveCity)) {
                this.selectedIndex = this.userCities.indexOf(caseInSensitiveCity) - 1;
              }
            }, 0);
            setTimeout(() => {
              this.selectedIndex = this.userCities.indexOf(caseInSensitiveCity);
            }, 100);
          },
            error => {
              console.log(error.error.message);
            }
          );
        }
      }
    );
  }

  removeCity(index: number) {
    this.userweatherForecastService.removeCity(this.user, this.userCities[index]);
    this.userCities = this.userweatherForecastService.loadUserCities(this.user);
    this.selectedIndex = index - 1;
  }

  logout() {
    this.isUserLoggedIn = false;
  }

  login(event: boolean) {
    this.isUserLoggedIn = event;
  }

  setUserData(event) {
    this.user = event;
    if (event) {
      this.userCities = this.userweatherForecastService.loadUserCities(this.user);
      this.selectedIndex = 0;
    }
  }

}
