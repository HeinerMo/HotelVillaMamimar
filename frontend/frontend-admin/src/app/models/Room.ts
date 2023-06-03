import { RoomType } from "./RoomType"

export class Room{
  
    id?: number
    roomTypeId?: number
    active?:number
    roomStatus?: string
    roomType?: string
    
    constructor({id, roomTypeId, active, roomStatus, roomType}:{id?: number, roomTypeId?: number, active?:number, roomStatus?:string, roomType?:string}) {
        this.id = id
        this.roomTypeId = roomTypeId
        this.active = active
        this.roomStatus = roomStatus
        this.roomType = roomType
    }
}