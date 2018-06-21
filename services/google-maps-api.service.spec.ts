import 'mocha';
import { expect } from 'chai';
import { GoogleMapsAPIService } from 'services/google-maps-api.service';

describe("GoogleMapsAPIService integration tests", function() {
  let googleMaps: GoogleMapsAPIService;

  beforeEach(function() {
    googleMaps = new GoogleMapsAPIService();
  });

  afterEach(function() {
    googleMaps = undefined;
  });

  describe("getTimeZone", function() {
    it("should return the name of the timezone the coordinates are in", async function() {
      const timeZone = await googleMaps.getTimeZone(44.96, -123.08);

      expect(timeZone).to.equal("Pacific Daylight Time");
    });

    it("should return null if lat/long coords are not valid", async function() {
      const timeZone = await googleMaps.getTimeZone(314159, 271828);

      expect(timeZone).to.be.null;
    });
  });
});
