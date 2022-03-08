import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryModel } from '../OtherLogic/Models/CategoryModel';
import { LegoModel } from '../OtherLogic/Models/LegoModel';
import { UserLogin } from '../OtherLogic/Models/UserLogin';
import { UserModel } from '../OtherLogic/Models/UserModel';
import { LegoService } from '../OtherLogic/Services/LegoService';
import { UserService } from '../OtherLogic/Services/UserService';
import { LoginUserStorage } from '../OtherLogic/StorageDataOfUser/LoginUserStorage';


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
  constructor(private readonly _userService : UserService, private readonly _legoService : LegoService) { }
  
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


  AllLego : Array<LegoModel> = []
  LegoByCategory : Array<LegoModel> = []
  UserChooseCategory : CategoryModel = new CategoryModel(null,"","")

  @Input()
  isShowLegobyCategory : boolean = false
  @Input()
  isShowCategories : boolean = true
  LegoResponce : any

  @Input()
  isShowTrendsLego : boolean = false

  @Output()
  OnClickBuy = new EventEmitter()

  ChooseCategory(category: CategoryModel) : void{
    this.isShowCategories = !this.isShowCategories
    this.isShowLegobyCategory = !this.isShowLegobyCategory

    this.UserChooseCategory = category
    this._legoService.getAllLego().subscribe((response) => {
      this.LegoResponce = response;
      this.AllLego = []
      this.LegoResponce.forEach((element: LegoModel) => {
        this.AllLego.push(element)
      });
      this.LegoByCategory = this.AllLego.filter(l => l.category.name == category.name)    
   }) 
   this.OnClickBuy.emit()
  }

  @Input()
  legoForTernds : Array<LegoModel> = []

}
