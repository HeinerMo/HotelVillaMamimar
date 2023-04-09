export class ContactInformation{
  
    phone?: String
    email?: String
    instagram?: URL
    facebook?: URL
    
    constructor({phone,email,insagram,facebook}:{phone?:String,email?:String,insagram?:URL,facebook?:URL}) {
        this.phone = phone
        this.email = email
        this.instagram = insagram
        this.facebook = facebook
    }

}