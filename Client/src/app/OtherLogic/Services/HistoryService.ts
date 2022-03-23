import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HistoryModel } from "../Models/HistoryModel";

@Injectable()
export class HistoryService {
    private readonly _urlAdress : string = 'https://localhost:7284/api/History'
    constructor(private http : HttpClient){
    }

    addToUsersHistory(item : HistoryModel) : Observable<Object>{
        return this.http.post(this._urlAdress ,item, {withCredentials: true} )
    }

    getAll() : Observable<Object>{
        return this.http.post(this._urlAdress , {withCredentials: true} )
    }
}