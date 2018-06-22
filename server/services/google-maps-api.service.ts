import request from 'request-promise-native';

export class GoogleMapsAPIService {
  public async getTimeZone(lat: number, lon: number): Promise<string> {
    try {
      const response = await request("https://maps.googleapis.com/maps/api/timezone/json", {
        qs: {
          location: `${lat},${lon}`,
          timestamp: Math.floor(new Date().getTime() / 1000),
          key: `${process.env.GOOGLE_MAPS_API_KEY}`
        }
      });
      const data = JSON.parse(response);
      return data.timeZoneName;
    }
    catch (err) {
      return null;
    }
  }

  public async getElevation(lat: number, lon: number): Promise<number> {
    try {
      const response = await request("https://maps.googleapis.com/maps/api/elevation/json", {
        qs: {
          locations: `${lat},${lon}`,
          key: `${process.env.GOOGLE_MAPS_API_KEY}`
        }
      });
      const data = JSON.parse(response);
      return parseInt(data.results[0].elevation);
    }
    catch (err) {
      return null;
    }
  }
}
