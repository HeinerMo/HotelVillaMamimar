import { MessageDataTransferObject } from "./MessageDTO";

export class ResponseDTO<T> extends MessageDataTransferObject{
  
    item?: T;
    constructor({ id, message, item }: { id?:number, message?:string, item?:T }) {
        super({ id, message });
        this.item = item;
    }

}