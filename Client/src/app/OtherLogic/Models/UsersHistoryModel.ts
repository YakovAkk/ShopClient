import { AddLegToBaketModel } from "./AddLegToBaketModel";
import { HistoryOrder } from "./HistoryOrder";
import { UserModel } from "./UserModel";

export class UsersHistoryModel{
    constructor(public user : UserModel, public orders : Array<HistoryOrder>)
    {

    }
}