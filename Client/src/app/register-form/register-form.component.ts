import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserRegistration } from '../Models/UserRegistration';
import { UserService } from '../Services/UserService';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  RegistrationResponse : any
  @Input()
  isShowComponent : boolean = false
  constructor(private readonly _userService : UserService) { }


  @Output()
  onClose = new EventEmitter() 

  Close() : void{
    this.onClose.emit()
  }
  
  ngOnInit(): void {
  }


  userName : string = ""
  userEmail : string = ""
  userPassword : string = ""
  userConfirmPassword : string = ""

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

    

    let user : UserRegistration = new UserRegistration(this.userName, this.userEmail,this.userPassword)

    console.log(user)
     this._userService.RegistrationUser(user).subscribe((response) => {
     this.RegistrationResponse = response;

     if(this.RegistrationResponse == null){
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
    
    this.userName = ""
    this.userEmail = ""
    this.userPassword = ""
    this.userConfirmPassword = ""
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

  isShowIncorrectPasswordNotEqual : boolean = false
  MessageWhatIsIncorrectPasswordNotEqual : string = ""
  ShowIncorrectPasswordNotEqual(str : string) : void{
    this.MessageWhatIsIncorrectPasswordNotEqual = str
    this.isShowIncorrectPasswordNotEqual = true
  }

  isShowIncorrectUser : boolean = false
  MessageWhatIsIncorrectUser : string = ""
  ShowIncorrectUser(str : string) : void{
    this.MessageWhatIsIncorrectUser = str
    this.isShowIncorrectUser = true
  }
}
