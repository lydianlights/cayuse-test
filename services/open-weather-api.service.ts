export class OpenWeatherAPIService {
  public async getLocationInfo(zipCode: string): Promise<OpenWeatherLocationInfo> {
    return null;
  }
}

export interface OpenWeatherLocationInfo {
  cityName: string;
  currentTempF: number;
  lat: number;
  long: number;
}
