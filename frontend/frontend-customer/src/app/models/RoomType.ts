import { Discount } from "./Discount"

export class RoomType{
  
    name?: String
    price?: number
    image?: ImageData
    description?: String
    discount?: Discount
    
    constructor({name, price, image, description, discount}:{name?: String, price?: number, image?: ImageData, description?: String, discount?: Discount}) {
        this.name = name
        this.price = price
        this.description = description
        this.discount = discount
    }

}