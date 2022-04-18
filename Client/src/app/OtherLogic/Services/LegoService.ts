import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable()
export class LegoService{
    constructor (private readonly http : HttpClient){
        
    }

    getAllLego() : Observable<Object> {
        return this.http.get('https://localhost:7284/api/Lego/all');
    }
}