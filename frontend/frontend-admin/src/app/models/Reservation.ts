import { Customer } from "./Customer"
import { Room } from "./Room"

export class Reservation{
  
    startingDate?: string
    endingDate?: string
    room?: Room
    customer?: Customer
    
    constructor({startingDate, endingDate, room, customer}:{startingDate?: string, endingDate?: string, room?: Room, customer?: Customer}) {
        this.startingDate = startingDate
        this.endingDate = endingDate
        this.room = room
        this.customer = customer
    }

}