export class Facility{
  
    description?: String
    image?: ImageData
    
    constructor({description, image}:{description?:String,image?:ImageData}) {
        this.description = description
        this.image = image
    }

}