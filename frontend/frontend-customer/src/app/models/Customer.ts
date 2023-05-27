
export class Customer{
  
    id_number?: String
    name?: String
    lastname?: String
    email?: String
    creditCardNumber?: String
    
    constructor({id_number, name, lastname, email, creditCardNumber}:{id_number?: String ,name?: String, lastname?: String, email?: String, creditCardNumber?: String}) {
        this.id_number = id_number
        this.name = name
        this.lastname = lastname
        this.email = email
        this.creditCardNumber = creditCardNumber
    }

}