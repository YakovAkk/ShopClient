import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddLegToBaketModel } from "../Models/AddLegToBaketModel";

@Injectable()
export class BasketService {
    constructor(private http : HttpClient){
    }

    getAllItemsFromBasket() : Observable<Object>{
        return this.http.get('https://localhost:7284/api/Basket/all');
    }
    additemToBasket(item : AddLegToBaketModel) : Observable<Object>{
        return this.http.post('https://localhost:7284/api/Basket' , item);
    }
}