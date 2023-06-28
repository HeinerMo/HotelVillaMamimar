export class Email{

    name?:String 
    emailAdress?: String
    subject?: String
    body?: String

    
    constructor({name, emailAdress, subject, body}:{name?: String, emailAdress?: String, subject?: String,  body?: String}) {
        this.name = name
        this.emailAdress = emailAdress
        this.subject = subject
        this.body = body
    }

} 