import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../Models/UserLogin';
import { UserRegistration } from '../Models/UserRegistration';
@Injectable()
export class UserService{
    private readonly url : string = 'https://localhost:7284/api/Account'
    constructor (private readonly http : HttpClient){
        
    }

    LoginUser( userLogin : UserLogin) : Observable<Object>{
        return this.http.post(this.url + '/Login',userLogin)
    }
    RegistrationUser(userRegistration : UserRegistration): Observable<Object>{
        return this.http.post(this.url + '/Register',userRegistration)
    }
    UserLogout(userLogin : UserLogin) : Observable<Object>{
       return this.http.post(this.url + '/Logout',userLogin)
    }
}