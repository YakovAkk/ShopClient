import { CategoryModel } from "./CategoryModel";

export class LegoModel{
    constructor( 
        public  id : string | null,
        public name : string,
        public imageUrl : string,
        public description : string,
        public price : number,
        public isFavorite : boolean,
        public category : CategoryModel
    ){}
}