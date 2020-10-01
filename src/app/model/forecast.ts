import { Cloud } from './cloud';
import { Main } from './main';
import { Rain } from './rain';
import { Sys } from './sys';
import { Weather } from './weather';
import { Wind } from './wind';

export interface Forecast {
    dt: string;
    main: Main;
    weather: Array<Weather>;
    clouds: Cloud;
    wind: Wind;
    visibility: number;
    pop: number;
    rain: Rain;
    sys: Sys;
    dt_txt: string;
}
