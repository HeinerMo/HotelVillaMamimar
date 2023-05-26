import { RoomType } from "./RoomType"

export class Room{
  
    Id?: number
    RoomTypeId?: number
    active?:number
    
    constructor({Id, RoomTypeId, active}:{Id?: number, RoomTypeId: number, active?:number}) {
        this.Id = Id
        this.RoomTypeId = RoomTypeId
        this.active = active
    }

}