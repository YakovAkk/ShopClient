import { LegoModel } from "./LegoModel";
import { UserModel } from "./UserModel";

export class AddLegToBaketModel{
    constructor(public id: string | null ,public lego : LegoModel,public userEmail: string , public amount : number = 1){
    }
}