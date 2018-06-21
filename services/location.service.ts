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
    // Run needed queries in parallel
    const apiResponses = await Promise.all([
      this.openWeather.getCityAndTemp(zipCode),
      this.googleMaps.getTimeZone(zipCode),
      this.googleMaps.getElevation(zipCode)
    ]);
    // Decode responses from Promise.all's arcane result array
    return new LocationData(
      zipCode,
      apiResponses[0].cityName,
      apiResponses[0].currentTempF,
      apiResponses[1],
      apiResponses[2]
    );
  }

  public validateZipCode(zipCode: string): boolean {
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(zipCode);
  }
}
