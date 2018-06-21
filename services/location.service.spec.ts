import 'mocha';
import { expect } from 'chai';
import * as td from 'testdouble';
import { LocationService } from 'services/location.service';
import { LocationData } from 'models/location-data.model';
import { GoogleMapsAPIService } from 'services/google-maps-api.service';
import { OpenWeatherAPIService } from 'services/open-weather-api.service';

describe("LocationService", function() {
  let locationService: LocationService;
  let openWeather: OpenWeatherAPIService;
  let googleMaps: GoogleMapsAPIService;

  beforeEach(function() {
    locationService = new LocationService();
    openWeather = td.object<OpenWeatherAPIService>(new OpenWeatherAPIService);
    googleMaps = td.object<GoogleMapsAPIService>(new GoogleMapsAPIService);
    // Stub private services
    (locationService as any).openWeather = openWeather;
    (locationService as any).googleMaps = googleMaps;
  });

  afterEach(function() {
    locationService = undefined;
    openWeather = undefined;
    googleMaps = undefined;
    td.reset();
  });

  describe("getLocationDataFromZIP", function() {
    beforeEach(function() {
      locationService.validateZipCode = td.func(locationService.validateZipCode);
    });
      
    it("should return a LocationData object", async function() {
      const testZip = "97304";
      td.when(locationService.validateZipCode(testZip)).thenReturn(true);
      td.when(openWeather.getCityAndTemp(testZip)).thenResolve({
        cityName: "Salem",
        currentTempF: 80
      });
      td.when(googleMaps.getTimeZone(testZip)).thenResolve("PST");
      td.when(googleMaps.getElevation(testZip)).thenResolve(154);

      const locationData = await locationService.getLocationDataFromZIP(testZip);
        
      expect(locationData).to.be.an.instanceof(LocationData);
      expect(locationData.zipCode).to.equal(testZip);
      expect(locationData.cityName).to.equal("Salem");
      expect(locationData.currentTempF).to.equal(80);
      expect(locationData.timeZone).to.equal("PST");
      expect(locationData.elevationFt).to.equal(154);
    });

    it("should return null if zipCode is invalid", async function() {
      td.when(locationService.validateZipCode("97EO4")).thenReturn(false);
      
      const locationData = await locationService.getLocationDataFromZIP("97EO4");

      expect(locationData).to.be.null;
    });
  });

  describe("validateZipCode", function() {
    it("should return true for a valid 5-digit zip code", function() {
      const isVerified = locationService.validateZipCode("97304");

      expect(isVerified).to.be.true;
    });

    it("should return false for an empty input", function() {
      const isVerified = locationService.validateZipCode("");

      expect(isVerified).to.be.false;
    });

    it("should return false if there are less than 5 digits", function() {
      const isVerified = locationService.validateZipCode("97");

      expect(isVerified).to.be.false;
    });

    it("should return false if there are more than 5 digits", function() {
      const isVerified = locationService.validateZipCode("97304444444");

      expect(isVerified).to.be.false;
    });

    it("should return false for a non-numeric input", function() {
      const isVerified = locationService.validateZipCode("abcde");

      expect(isVerified).to.be.false;
    });
  });
});
