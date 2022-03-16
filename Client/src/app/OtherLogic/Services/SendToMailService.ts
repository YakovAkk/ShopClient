import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { LoginUserStorage } from "../StorageDataOfUser/LoginUserStorage";
@Injectable()
export class SendToMailService{
    private readonly _urlAdress : string = 'https://localhost:7284/api/SendToMail'
    constructor (private readonly http : HttpClient){
        
    }

    Send(list : string) : Observable<Object>{
        let user = LoginUserStorage.getInstance().getUser()
        //console.log("User :",user)

        let request = {
            email : user.Email,
            subject : user.NickName,
            letter : list
        }
        //console.log('Request : ' , request)
        return this.http.post(this._urlAdress , request,{withCredentials: true});
    }
}