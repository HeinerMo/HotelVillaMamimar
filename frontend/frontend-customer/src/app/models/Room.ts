import { RoomType } from "./RoomType"

export class Room{
  
    number?: number
    roomType?: RoomType
    status?:number
    
    constructor({number, roomType, status}:{number?: number, roomType?: RoomType, status?:number}) {
        this.number = number
        this.roomType = roomType
        this.status = status
    }

}