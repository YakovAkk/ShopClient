import { AddLegToBaketModel } from "./AddLegToBaketModel";

export class HistoryModel{
    constructor(
        public userEmail : string,
        public orders : Array<AddLegToBaketModel>
    ){

    }
}