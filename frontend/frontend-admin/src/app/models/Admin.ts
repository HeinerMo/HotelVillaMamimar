export class Admin {

    id?: number;
    userName?: string;
    password?: string;

    constructor({ id, userName, password }: { id?: number, userName?: string, password?: string}) {
        this.id = id;
        this.userName = userName;
        this.password = password;
    }

}