import { LegoModel } from "./LegoModel";
import { UserModel } from "./UserModel";

export class AddLegToBaketModel{
    constructor(public lego : LegoModel,public user : UserModel , public amount : number = 1){

    }
}