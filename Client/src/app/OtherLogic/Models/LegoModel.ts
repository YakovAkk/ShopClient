import { CategoryModel } from "./CategoryModel";

export class LegoModel{
    constructor(
        Id : string | null,
        Name : string,
        ImageUrl : string,
        Description : string,
        Price : number,
        isFavorite : boolean,
        Category : CategoryModel
    ){}
}