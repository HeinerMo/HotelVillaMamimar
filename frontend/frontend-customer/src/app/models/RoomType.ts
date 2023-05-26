import { Discount } from "./Discount"

export class RoomType{
    
    name?: String
    price?: number
    image?: any
    description?: String
    discountPercentage?: number
    finalPrice?: number
    discount?: Discount
    id?: number
    


    constructor({name, price, image, description, discountPercentage,finalPrice,discount, id}:{name?: String, price?: number, image?: any, description?: String, discountPercentage?: number,finalPrice?: number,discount?: Discount, id?: number}) {
        this.name = name
        this.price = price
        this.image=image
        this.description = description
        this.discountPercentage = discountPercentage
        this.finalPrice = finalPrice
        this.discount = discount
        this.id = id
    }

}