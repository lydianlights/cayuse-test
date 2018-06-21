import { Request, Response } from "express";
import { LocationService } from 'services/location.service';

export class LocationController {
  private locationService = new LocationService();

  getLocationData = async (req: Request, res: Response) => {
    try {
      if (!req.query.zipCode) {
        res.status(400);
        res.json({
          error: "Missing zipCode query param"
        });
        return;
      }
      let locationData = await this.locationService.getLocationDataFromZIP(req.query.zipCode);
      if(!locationData) {
        res.status(400);
        res.json({
          error: "Provided zipcode could not be parsed"
        });
        return;
      }
      res.status(200);
      res.json(locationData);
      return;
    }
    catch(err) {
      res.status(500);
      res.json({
        error: "Internal server error"
      });
    }
  };
}
