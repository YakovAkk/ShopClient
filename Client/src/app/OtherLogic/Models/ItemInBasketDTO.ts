import { LegoModel } from "./LegoModel";

export class ItemInBasketDTO{
    constructor(public lego : LegoModel ,public amount : number){

    }
}