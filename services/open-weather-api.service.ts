import request from 'request-promise-native';

export class OpenWeatherAPIService {
  public async getLocationInfo(zipCode: string): Promise<OpenWeatherLocationInfo> {
    try {
      const response = await request("https://api.openweathermap.org/data/2.5/weather", {
        qs: {
          zip: `${zipCode},us`,
          units: 'imperial',
          APPID: `a6a9d2af91b7a99c2cec7815f142c426`
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
