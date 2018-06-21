export class LocationData {
  constructor(
    public zipCode: string,
    public cityName: string,
    public currentTempF: number,
    public timeZone: string,
    public elevationFt: number
  ) { }
}
