export class Location{
  
    latitude?: number
    longitude?: number
    extraDetails?: String
    
    constructor({latitude, longitude, extraDetails}:{latitude?: number, longitude?: number, extraDetails?: String}) {
        this.latitude = latitude
        this.longitude = longitude
        this.extraDetails = extraDetails
    }

}