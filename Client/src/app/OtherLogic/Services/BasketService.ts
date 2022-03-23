import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddLegToBaketModel } from "../Models/AddLegToBaketModel";

@Injectable()
export class BasketService {
    
    private readonly _urlAdress : string = 'https://localhost:7284/api/Basket'
    constructor(private http : HttpClient){
    }

    getAllItemsFromBasket() : Observable<Object>{
        return this.http.get(this._urlAdress + '/all',{withCredentials: true});
    }
    additemToBasket(item : AddLegToBaketModel) : Observable<Object>{
        return this.http.post(this._urlAdress , item,{withCredentials: true});
    }
    deleteItemById(itemsId : string | null) : Observable<Object>{
        // let request = {
        //     id: itemsId
        // }
        // console.log(request)

        let url = this._urlAdress + '/' + itemsId

        console.log("id : " + itemsId);
        
        return this.http.delete(`https://localhost:7284/api/Basket/${itemsId}`, {withCredentials: true})
    }

    putItem(item : AddLegToBaketModel) : Observable<Object>{
        return this.http.put(this._urlAdress , item,{withCredentials: true});
    }

    SaveChanges(ItemForAddedInBasker: AddLegToBaketModel[]) {
        //console.log(ItemForAddedInBasker);
        
        ItemForAddedInBasker.forEach(element => {
            //console.log( "Service : ", element)
            this.putItem(element).subscribe(responce => {
                //console.log(responce);
                
            })
      });
    }
}