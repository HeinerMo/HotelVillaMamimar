export class ContactInformation{
  
    phone?: String
    email?: String
    instagram?: String
    facebook?: String
    
    constructor({phone,email,instagram,facebook}:{phone?:String,email?:String,instagram?:String,facebook?:String}) {
        this.phone = phone
        this.email = email
        this.instagram = instagram
        this.facebook = facebook
    }

}