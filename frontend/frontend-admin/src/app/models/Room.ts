import { RoomType } from "./RoomType"

export class Room{
  
    id?: number
    roomTypeId?: number
    active?:number
    
    constructor({id, roomTypeId, active}:{id?: number, roomTypeId?: number, active?:number}) {
        this.id = id
        this.roomTypeId = roomTypeId
        this.active = active
    }
}