import { City } from './city';
import { Forecast } from './forecast';

export interface FiveDayForecast {
    cod: number;
    message: string;
    list: Array<Forecast>;
    city: City;
}
