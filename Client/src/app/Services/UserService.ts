import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../Models/UserLogin';
export class UserService{
    constructor (private http : HttpClient){
        
    }

    LoginUser( userLogin : UserLogin) : Observable<Object>{
        return this.http.post('https://localhost:7284/api/Account/Login',userLogin)
    }
}