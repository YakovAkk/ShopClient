import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserLogin } from '../Models/UserLogin';
import { UserModel } from '../Models/UserModel';
import { UserService } from '../Services/UserService';
import { LoginUserStorage } from '../StorageDataOfUser/LoginUserStorage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public _userStorage : LoginUserStorage = LoginUserStorage.getInstance()
  @Input()
  isShowComponent : boolean = true
  isShowSideBar : boolean = false
  isShowLogin : boolean = false
  @Output()
  onShowSideBar = new EventEmitter() 

  ShowSideBar() : void{
    this.isShowSideBar = !this.isShowSideBar;
    this.onShowSideBar.emit()
  }

  @Output()
  onShowLogin = new EventEmitter() 

  ShowLogin() : void{
    this.isShowLogin = !this.isShowLogin;
    this.onShowLogin.emit()
  }

  isShowRegistration : boolean = false
  @Output()
  onShowRegistration = new EventEmitter() 

  ShowRegistration() : void{
    this.isShowRegistration = !this.isShowRegistration;
    this.onShowRegistration.emit()
  }
  constructor(private readonly _userService : UserService) { }
  
  @Input()
  public isLoginUser : boolean = true

  
  ngOnInit(): void {
    
  }

  Logout() : void{
    let user : UserModel = this._userStorage.getUser()
    this._userService.UserLogout(new UserLogin(user.NickName,user.Email,user.RememberMe)).subscribe((response) => {
       console.log(response)
       this.isLoginUser = !this.isLoginUser
    }) 
  }

}
