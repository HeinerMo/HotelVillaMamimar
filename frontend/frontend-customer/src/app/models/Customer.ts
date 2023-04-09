
export class Customer{
  
    idNumber?: String
    name?: String
    lastname?: String
    email?: String
    creditCardNumber?: String
    
    constructor({idNumber, name, lastname, email, creditCardNumber}:{idNumber?: String ,name?: String, lastname?: String, email?: String, creditCardNumber?: String}) {
        this.idNumber = idNumber
        this.name = name
        this.lastname = lastname
        this.email = email
        this.creditCardNumber = creditCardNumber
    }

}