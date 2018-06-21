import { LocationData } from 'models/location-data.model';
import { GoogleMapsAPIService } from 'services/google-maps-api.service';
import { OpenWeatherAPIService } from 'services/open-weather-api.service';

export class LocationService {
  private openWeather: OpenWeatherAPIService = new OpenWeatherAPIService();
  private googleMaps: GoogleMapsAPIService = new GoogleMapsAPIService();

  public async getLocationDataFromZIP(zipCode: string): Promise<LocationData> {
    if(!this.validateZipCode(zipCode)) {
      return null;
    }
    const weatherInfo = await this.openWeather.getLocationInfo(zipCode);
    if(!weatherInfo) {
      return null;
    }
    const timezone = await this.googleMaps.getTimeZone(weatherInfo.lat, weatherInfo.long);
    const elevation = await this.googleMaps.getElevation(weatherInfo.lat, weatherInfo.long);
    return new LocationData(
      zipCode,
      weatherInfo.cityName,
      weatherInfo.currentTempF,
      timezone,
      elevation
    );
  }

  public validateZipCode(zipCode: string): boolean {
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(zipCode);
  }
}
