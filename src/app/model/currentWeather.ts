import { Cloud } from './cloud';
import { Coord } from './coord';
import { Main } from './main';
import { Sys } from './sys';
import { Weather } from './weather';
import { Wind } from './wind';

export interface CurrentWeather {
    coord: Coord;
    weather: Array<Weather>;
    base: any;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Cloud;
    dt: string;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}
