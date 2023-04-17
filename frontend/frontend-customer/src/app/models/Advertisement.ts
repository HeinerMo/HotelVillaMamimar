
export class Advertisement{
  
    image?: String
    url?: String
    
    constructor({image, url}:{image?: String,url?: String}) {
        this.image = image
        this.url = url
    }

}