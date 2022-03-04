import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CategoryService{
    constructor(private http : HttpClient){
    }

    getCategories() : Observable<Object>{
        return this.http.get('https://localhost:7284/api/Category/all');
    }

}