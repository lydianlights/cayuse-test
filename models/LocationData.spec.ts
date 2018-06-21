import 'mocha';
import { expect } from 'chai';
import { LocationData } from './LocationData';

describe("LocationData model", function() {
  describe("constructor", function() {
    it("should create an object with the passed in properties", function() {
      const zipCode = "97304";
      const cityName = "Salem";
      const currentTempF = 80;
      const timeZone = "PT"
      const elevationFt = 154;

      const testLocationData = new LocationData(
        zipCode,
        cityName,
        currentTempF,
        timeZone,
        elevationFt
      );

      expect(testLocationData.zipCode).to.equal(zipCode);
      expect(testLocationData.cityName).to.equal(cityName);
      expect(testLocationData.currentTempF).to.equal(currentTempF);
      expect(testLocationData.timeZone).to.equal(timeZone);
      expect(testLocationData.elevationFt).to.equal(elevationFt);
    });
  });
});
