import 'mocha';
import { expect } from 'chai';
import dotenv from 'dotenv';
import { OpenWeatherAPIService } from 'services/open-weather-api.service';

describe("OpenWeatherAPIService integration tests", function() {
  this.beforeAll(function() {
    dotenv.config();
  });

  let openWeather: OpenWeatherAPIService;

  beforeEach(function () {
    openWeather = new OpenWeatherAPIService();
  });

  afterEach(function () {
    openWeather = undefined;
  });

  describe("getLocationInfo", function() {
    it("should return weather info about the location", async function() {
      const locationInfo = await openWeather.getLocationInfo("97304");
      
      expect(locationInfo.cityName).to.equal("Salem");
      expect(locationInfo).to.haveOwnProperty('currentTempF').that.is.a('number');
      expect(locationInfo.lat).to.equal(44.96);
      expect(locationInfo.lon).to.equal(-123.08);
    });

    it("should return null if zip code is invalid", async function() {
      const locationInfo = await openWeather.getLocationInfo("aaaaaa");

      expect(locationInfo).to.be.null;
    })
  });
});
