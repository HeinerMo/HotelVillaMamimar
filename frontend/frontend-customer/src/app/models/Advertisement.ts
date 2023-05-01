import { SafeUrl } from "@angular/platform-browser"

export class Advertisement{
  
    image?: any
    url?: String
    
    constructor({image, url}:{image?: any,url?: String}) {
        this.image = image
        this.url = url
    }

}