import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { UserLogin } from '../Models/UserLogin';
import { UserService } from '../Services/UserService';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {
  @Input()
  isShowComponent : boolean = false

  @Output()
  onClose = new EventEmitter() 

  Close() : void{
    this.onClose.emit()
  }

  LoginResponse : any

  constructor(private readonly _userService : UserService) { }

  ngOnInit(): void {
  }

  userEmail : string = ""
  userPassword : string = ""
  userRememberMe : boolean = false

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

    let user : UserLogin = new UserLogin(this.userEmail,this.userPassword,this.userRememberMe)

     console.log(user)
      this._userService.LoginUser(user).subscribe((response) => {
      this.LoginResponse = response;

      if(this.LoginResponse == null){
        this.ShowIncorrectUser("Incorrect email or password. If you haven't account , you can register.")
        console.error("Incorrect email or password")
        return
      }

      console.log("Great!!")

      this.onClose.emit()
      //  for (let item of this.CategoryResponse) {
      //     this.Categories.push(new CategoryModel(item.id,item.name,item.imageUrl))
      //  }
       
    })
     
     this.userEmail = ""
     this.userPassword = ""
  }


  isShowIncorrectEmail : boolean = false
  MessageWhatIsIncorrectEmail : string = ""
  ShowIncorrectEmail(str : string) : void{
    this.MessageWhatIsIncorrectEmail = str
    this.isShowIncorrectEmail = true
  }

  isShowIncorrectPassword : boolean = false
  MessageWhatIsIncorrectPassword : string = ""
  ShowIncorrectPassword(str : string) : void{
    this.MessageWhatIsIncorrectPassword = str
    this.isShowIncorrectPassword = true
  }

  isShowIncorrectUser : boolean = false
  MessageWhatIsIncorrectUser : string = ""
  ShowIncorrectUser(str : string) : void{
    this.MessageWhatIsIncorrectUser = str
    this.isShowIncorrectUser = true
  }
}
