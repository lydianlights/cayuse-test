# Cayuse Code Test

Takes a user-input zip code and outputs the city name, current temperature, time zone, and elevation at that location.

## Instructions

This repo contains 2 projects: the API server and the frontend client app. They need to be installed and run seperately.

## Server

The server requires an API key for [OpenWeatherAPI](https://openweathermap.org/api) and [GoogleMaps API](https://cloud.google.com/maps-platform/). Once you have obtained API keys for these services, you should make a file named `.env` in the server directory and add the keys as follows:
```json
OPEN_WEATHER_API_KEY="{YOUR_KEY_HERE}"
GOOGLE_MAPS_API_KEY="{YOUR_KEY_HERE}"
```
After that the server is ready to be run.

* Open a terminal and navigate to the `server` directory.
* Run `npm install`
* Run `npm start` to start listening for API calls
* Default port is `3000`

## Client

* Open a terminal and navigate to the `client` directory.
* Run `npm install`
* Run `npm run build` to build the Vue app
* Run `npm start` to start serving the page
* Default port is `8080`
