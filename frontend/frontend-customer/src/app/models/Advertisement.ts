
export class Advertisement{
  
    image?: ImageData
    url?: URL
    
    constructor({image, url}:{image?: ImageData,url?: URL}) {
        this.image = image
        this.url = url
    }

}