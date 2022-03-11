
import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { UserLogin } from '../OtherLogic/Models/UserLogin';
import { UserModel } from '../OtherLogic/Models/UserModel';
import { UserService } from '../OtherLogic/Services/UserService';
import { LoginUserStorage } from '../OtherLogic/StorageDataOfUser/LoginUserStorage';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  private _userStorage : LoginUserStorage = LoginUserStorage.getInstance()
  @Input()
  isShowComponent = false

  @Output()
  onClose = new EventEmitter() 

  @Output()
  onLogin = new EventEmitter() 


  Close() : void{
    this.onClose.emit()
  }

  LoginResponse : any

  constructor(private readonly _userService : UserService) { }

  ngOnInit(): void {
  }

  userEmail = ""
  userPassword  = ""
  userRememberMe  = false

  Checked(){
    this.userRememberMe = !this.userRememberMe
  }

  OnClick() : void{
    this.ShowIncorrectEmail("")
    this.ShowIncorrectPassword("")
    if(!this.userEmail.includes('@') && !this.userEmail.includes('.')){
      this.ShowIncorrectEmail("Incorrect Email")
      console.error("Incorrect Email")
      return
    }
    if(this.userPassword.length == 0){
      this.ShowIncorrectPassword("Password can't be empty!")
      console.error("password can't be empty!")
      return
    }

    let user = new UserLogin(this.userEmail,this.userPassword,this.userRememberMe)

     console.log(user)
      this._userService.LoginUser(user).subscribe((response) => {
      this.LoginResponse = response;

      if(this.LoginResponse == null){
        this.ShowIncorrectUser("Incorrect email or password. If you haven't account , you can register.")
        console.error("Incorrect email or password")
        return
      }

      this._userStorage.setUser(new UserModel(this.LoginResponse.nickName,
        this.LoginResponse.email,this.LoginResponse.rememberMe))

      alert("Welcome!")
      this.onLogin.emit()
      this.onClose.emit()
       
      console.log("Responce :" , this.LoginResponse.header);
      
       
    })
    
     this.userEmail = ""
     this.userPassword = ""
  }

  isShowIncorrectEmail = false
  MessageWhatIsIncorrectEmail = ""
  ShowIncorrectEmail(str : string) : void{
    this.MessageWhatIsIncorrectEmail = str
    this.isShowIncorrectEmail = true
  }

  isShowIncorrectPassword = false
  MessageWhatIsIncorrectPassword  = ""
  ShowIncorrectPassword(str : string) : void{
    this.MessageWhatIsIncorrectPassword = str
    this.isShowIncorrectPassword = true
  }

  isShowIncorrectUser = false
  MessageWhatIsIncorrectUser : string = ""
  ShowIncorrectUser(str : string) : void{
    this.MessageWhatIsIncorrectUser = str
    this.isShowIncorrectUser = true
  }
}
