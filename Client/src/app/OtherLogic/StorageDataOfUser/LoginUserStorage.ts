
import { UserModel } from "../Models/UserModel";
export class LoginUserStorage {
    private static instance : LoginUserStorage
    private constructor() { }

    public static getInstance(): LoginUserStorage {
        if (!LoginUserStorage.instance) {
            LoginUserStorage.instance = new LoginUserStorage()
        }

        return LoginUserStorage.instance;
    }

    private user = new UserModel("","",false)

    isUserEmpty() : boolean{
        if(this.user == new UserModel("","",false)){
            return true
        }
        else{
            return false
        }
    }

    setUser(user : UserModel) : void{
        this.user = user
    }
    getUser() : UserModel {
        return this.user
    }
    
}