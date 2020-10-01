import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cityName' })
export class CityNamePipe implements PipeTransform {
    transform(cityName: string): string {
        let newName = '';
        let separator = '';

        if (cityName.includes(' ')) {
            separator = ' ';
        } else if (cityName.includes('-')) {
            separator = '-';
        }

        if (separator !== '') {
            cityName.split(separator).forEach(item => {
                newName = newName + (!!newName ? separator : '') + item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
            });
        } else {
            newName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
        }

        return newName;
    }
}
