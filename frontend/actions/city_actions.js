import * as CityAPIUtil from '../util/city_api_util';
export const RECEIVE_ALL_CITIES = 'RECEIVE_ALL_CITIES';
export const RECEIVE_CITY = 'RECEIVE_CITY';

const receiveAllCities = (cities) => ({
  type: RECEIVE_ALL_CITIES,
  cities
});

const receiveCity = (city) => ({
  type: RECEIVE_CITY,
  city
});
export const fetchCities = () => dispatch => (
  CityAPIUtil.fetchCities()
    .then(cities => dispatch(receiveAllCities(cities)))
);

export const fetchCity = (city) => dispatch => (
  CityAPIUtil.fetchCity(city)
    .then(city => dispatch(receiveCity(city)))
);