import { Component, Output } from '@angular/core';
import { LegoModel } from './OtherLogic/Models/LegoModel';
import { LegoService } from './OtherLogic/Services/LegoService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private readonly _legoService : LegoService){
    
  }
  title = 'Client';
  isShowSideBar : boolean = true
  isHideSideBarFromLogin : boolean = true
  isHideSideBarFromHeader : boolean = false

  isShowHeader: boolean = true
  isShowLogin : boolean = false
  isShowRegistration : boolean = false

  ShowSideBar() : void{
      this.isShowSideBar = !this.isShowSideBar
  }
  ShowHeader() : void{
    this.isShowHeader = !this.isShowHeader
  }

  hideSideBarFromHeader() : void{
    this.isHideSideBarFromHeader = !this.isHideSideBarFromHeader
    this.ShowSideBar()
  }
  
  ShowLogin() : void{
    this.isShowLogin = !this.isShowLogin
    if(this.isShowSideBar == true){
      this.ShowSideBar()
    }
    this.ShowHeader()
  }

  
  ShowRegistration() : void{
    this.isShowRegistration = !this.isShowRegistration
    if(this.isShowSideBar == true){
      this.ShowSideBar()
    }
    this.ShowHeader()
  }

  CloseLogin() : void{
    this.isShowLogin = !this.isShowLogin
    if(this.isHideSideBarFromHeader != true){
      this.ShowSideBar()
    }
    this.ShowHeader()
  }
  CloseRegistration() : void {
    this.isShowRegistration = !this.isShowRegistration
    if(this.isHideSideBarFromHeader != true){
      this.ShowSideBar()
    }
    this.ShowHeader()
  }

  isShowBasketaAndLogoutButton : boolean = true
  onLogin() : void{
    this.isShowBasketaAndLogoutButton = !this.isShowBasketaAndLogoutButton
  }

  isShowLegoByCategory : boolean = false
  isShowCategories : boolean = true
  isShowTrendsLego : boolean = false

  OnHomeClick(): void{
    this.isShowCategories = true
    this.isShowTrendsLego = false
    this.isShowLegoByCategory = false
  }

  ClickBuy(): void{
    this.isShowCategories = false
    this.isShowTrendsLego = false
    this.isShowLegoByCategory = true
  }

  AllLego : Array<LegoModel> = []
  LegoByFavorite : Array<LegoModel> = []
  LegoResponce : any
  OnTrendClick(): void{
    this._legoService.getAllLego().subscribe((response) => {
      this.LegoResponce = response;
      this.AllLego = []
      this.LegoResponce.forEach((element: LegoModel) => {
        this.AllLego.push(element)
      });
      this.LegoByFavorite = this.AllLego.filter(l => l.isFavorite)    
   })
    this.isShowCategories = false
    this.isShowTrendsLego = true
    this.isShowLegoByCategory = false
  }
 
  isShowBasket : boolean = false
  ShowBasket() : void{ 
    this.isShowHeader = false
    this.isShowSideBar = false
    this.isShowCategories = false
    this.isShowTrendsLego = false
    this.isShowLegoByCategory = false
    this.isShowBasket = true
  }

  CloseBasket(){
    this.isShowBasket = false
    this.isShowHeader = true
    if(this.isHideSideBarFromHeader != true){
      this.ShowSideBar()
    }
    
    this.isShowCategories = true
  }
}
