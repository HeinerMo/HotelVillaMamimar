import { Advertisement } from "./Advertisement"
import { ContactInformation } from "./ContactInformation"
import { Facility } from "./Facility"
import { Location } from "./Location"
import { Room } from "./Room"
import { Season } from "./Season"

export class Hotel{
  
    name?: String
    logo?: String
    contactInformation?: ContactInformation
    homeInformation?: String
    homeImage?: ImageData
    aboutInformation?: String
    aboutImages?: ImageData[]
    facilities?: Facility[]
    location?: Location
    adverts?: Advertisement[]
    rooms?: Room[]
    season?: Season
    
    constructor({name, logo, contactInformation, homeInformation, homeImage, aboutInformation, aboutImages, 
        facilities, location, adverts, rooms, season}:{name?: String, logo?: String, contactInformation?: ContactInformation,
            homeInformation?: String, homeImage?: ImageData, aboutInformation?: String, aboutImages?: ImageData[], 
            facilities?: Facility[], location?: Location, adverts?: Advertisement[], rooms?: Room[], season?: Season}) {
        this.name = name
        this.logo = logo
        this.contactInformation = contactInformation
        this.homeInformation =homeInformation
        this.homeImage = homeImage
        this.aboutInformation = aboutInformation
        this.aboutImages = aboutImages
        this.facilities = facilities
        this.location = location
        this.adverts = adverts
        this.rooms = rooms
        this.season = season
    }

}