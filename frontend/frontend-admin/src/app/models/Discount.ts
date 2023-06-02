import { RoomType } from "./RoomType"

export class Discount{

    name?: String
    startingDate?: Date
    endingDate?: Date
    
    constructor({name, startingDate, endingDate}:{name?: String, startingDate?: Date, endingDate?: Date}) {
        this.name = name
        this.startingDate = startingDate
        this.endingDate = endingDate
    }

}