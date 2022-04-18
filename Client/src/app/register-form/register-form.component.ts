import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserRegistration } from '../OtherLogic/Models/UserRegistration';
import { UserService } from '../OtherLogic/Services/UserService';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  RegistrationResponse : any
  @Input()
  isShowComponent = false
  constructor(private readonly _userService : UserService) { }


  @Output()
  onClose = new EventEmitter() 
  Close() : void{
    this.onClose.emit()
  }
  
  ngOnInit(): void {
  }


  userName = ""
  userEmail = ""
  userPassword = ""
  userConfirmPassword = ""
  @Output()
  onShowWrongPopup = new EventEmitter() 
  @Output()
  onShowSuccessfullPopup = new EventEmitter() 
  OnClick(){
    this.ShowIncorrectEmail("")
    this.ShowIncorrectPassword("")
    this.ShowIncorrectPasswordNotEqual("")
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
    if(this.userPassword != this.userConfirmPassword){
      this.ShowIncorrectPasswordNotEqual("Passwords must be equal each other")
      console.error("Passwords must be equal each other")
      return
    }
    let user = new UserRegistration(this.userName, this.userEmail,this.userPassword)

    console.log(user)
     this._userService.RegistrationUser(user).subscribe((response) => {
     this.RegistrationResponse = response;

     console.log(this.RegistrationResponse);
     
     if(this.RegistrationResponse == null){
       this.ShowIncorrectUser("Incorrect email or password is too easy.")
       //console.error("Incorrect email or password")
       return
     }

     if(this.RegistrationResponse.result){
      this.onShowWrongPopup.emit(this.RegistrationResponse.result)
     }
     else{
        //alert("Register was completed succsessfuly, now you can login)")

        //console.log("Great!!")

        this.onClose.emit()
        this.onShowSuccessfullPopup.emit("Register was completed succsessfuly, now you can login")
     }



    
      
   })
    
    this.userName = ""
    this.userEmail = ""
    this.userPassword = ""
    this.userConfirmPassword = ""
  }



  isShowIncorrectEmail = false
  MessageWhatIsIncorrectEmail = ""
  ShowIncorrectEmail(str : string) : void{
    this.MessageWhatIsIncorrectEmail = str
    this.isShowIncorrectEmail = true
  }

  isShowIncorrectPassword = false
  MessageWhatIsIncorrectPassword = ""
  ShowIncorrectPassword(str : string) : void{
    this.MessageWhatIsIncorrectPassword = str
    this.isShowIncorrectPassword = true
  }

  isShowIncorrectPasswordNotEqual = false
  MessageWhatIsIncorrectPasswordNotEqual = ""
  ShowIncorrectPasswordNotEqual(str : string) : void{
    this.MessageWhatIsIncorrectPasswordNotEqual = str
    this.isShowIncorrectPasswordNotEqual = true
  }

  isShowIncorrectUser = false
  MessageWhatIsIncorrectUser : string = ""
  ShowIncorrectUser(str : string) : void{
    this.MessageWhatIsIncorrectUser = str
    this.isShowIncorrectUser = true
  }
}
