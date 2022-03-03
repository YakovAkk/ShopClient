import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../Models/UserLogin';
import { UserRegistration } from '../Models/UserRegistration';
@Injectable()
export class UserService{
    constructor (private readonly http : HttpClient){
        
    }

    LoginUser( userLogin : UserLogin) : Observable<Object>{
        return this.http.post('https://localhost:7284/api/Account/Login',userLogin)
    }
    RegistrationUser(userRegistration : UserRegistration): Observable<Object>{
        return this.http.post('https://localhost:7284/api/Account/Register',userRegistration)
    }
}