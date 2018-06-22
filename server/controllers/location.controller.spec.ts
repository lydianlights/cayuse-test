import 'mocha';
import { expect } from 'chai';
import httpMocks from 'node-mocks-http';
import td from 'testdouble';
import { LocationController } from 'controllers/location.controller';
import { LocationService } from 'services/location.service';

describe("LocationController", function() {
  let locationController: LocationController;
  let locationService: LocationService;

  beforeEach(function() {
    locationController = new LocationController();
    locationService = td.object(new LocationService);
    // Stub private services
    (locationController as any).locationService = locationService;
  });

  afterEach(function() {
    locationController = undefined;
    locationService = undefined;
  });

  describe("getLocationData", function() {
    let requestOpts: httpMocks.RequestOptions;

    beforeEach(function() {
      requestOpts = {
        method: 'GET',
        url: '/api/location-data',
        query: {
          zipCode: "97304"
        }
      };

      td.when(locationService.getLocationDataFromZIP("97304"))
        .thenResolve({
          zipCode: "97304",
          cityName: "Salem",
          currentTempF: 70,
          timeZone: "Pacific Daylight Time",
          elevationFt: 117
        });
    });

    afterEach(function() {
      requestOpts = undefined;
    });

    it("should return location data with status 200 on a valid request", async function() {
      const req = httpMocks.createRequest(requestOpts);
      const res = httpMocks.createResponse();

      await locationController.getLocationData(req, res);
      const data = JSON.parse(res._getData());

      expect(res.statusCode).to.equal(200);
      expect(data.zipCode).to.equal("97304");
      expect(data.cityName).to.equal("Salem");
      expect(data.currentTempF).to.equal(70);
      expect(data.timeZone).to.equal("Pacific Daylight Time");
      expect(data.elevationFt).to.equal(117);
    });

    it("should return status 400 if no query params are sent", async function() {
      requestOpts.query = undefined;
      const req = httpMocks.createRequest(requestOpts);
      const res = httpMocks.createResponse();

      await locationController.getLocationData(req, res);
      const data = JSON.parse(res._getData());

      expect(res.statusCode).to.equal(400);
      expect(data.error).to.not.be.null;
    });
    
    it("should return status 400 if zipCode query param is missing", async function() {
      requestOpts.query.zipCode = undefined;
      const req = httpMocks.createRequest(requestOpts);
      const res = httpMocks.createResponse();

      await locationController.getLocationData(req, res);
      const data = JSON.parse(res._getData());

      expect(res.statusCode).to.equal(400);
      expect(data.error).to.not.be.null;
    });

    it("should return status 400 if zipCode can't be parsed", async function() {
      requestOpts.query.zipCode = "aaaaa";
      td.when(locationService.getLocationDataFromZIP("aaaaa"))
        .thenResolve(null);

      const req = httpMocks.createRequest(requestOpts);
      const res = httpMocks.createResponse();

      await locationController.getLocationData(req, res);
      const data = JSON.parse(res._getData());

      expect(res.statusCode).to.equal(400);
      expect(data.error).to.not.be.null;
    });

    it("should return status 500 if an error is thrown", async function () {
      td.when(locationService.getLocationDataFromZIP("97304"))
        .thenThrow(new Error("test error"));
      const req = httpMocks.createRequest(requestOpts);
      const res = httpMocks.createResponse();

      await locationController.getLocationData(req, res);
      const data = JSON.parse(res._getData());

      expect(res.statusCode).to.equal(500);
      expect(data.error).to.not.be.null;
    });
  });
});
