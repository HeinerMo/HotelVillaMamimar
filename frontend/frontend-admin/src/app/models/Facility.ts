export class Facility{
  
    description?: String
    image?: any
    
    constructor({description, image}:{description?:String,image?:any}) {
        this.description = description
        this.image = image
    }

}