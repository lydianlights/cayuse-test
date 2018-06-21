import request from 'request-promise-native';

export class OpenWeatherAPIService {
  public async getLocationInfo(zipCode: string): Promise<OpenWeatherLocationInfo> {
    try {
      const response = await request("https://api.openweathermap.org/data/2.5/weather", {
        qs: {
          zip: `${zipCode},us`,
          units: 'imperial',
          APPID: `${process.env.OPEN_WEATHER_API_KEY}`
        }
      });
      const data = JSON.parse(response);
      return {
        cityName: data.name,
        currentTempF: parseFloat(data.main.temp),
        lat: parseFloat(data.coord.lat),
        lon: parseFloat(data.coord.lon)
      };
    }
    catch(err) {
      return null;
    }
  }
}

export interface OpenWeatherLocationInfo {
  cityName: string;
  currentTempF: number;
  lat: number;
  lon: number;
}
