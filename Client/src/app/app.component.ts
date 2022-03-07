import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
    console.log( this.isHideSideBarFromHeader)
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

  OnHomeClick(){
    if(this.isShowCategories != true){
      this.isShowCategories = !this.isShowCategories
      this.isShowLegoByCategory = !this.isShowLegoByCategory
    }
    
  }

  ClickBuy(){
    this.isShowCategories = !this.isShowCategories
    this.isShowLegoByCategory = !this.isShowLegoByCategory
  }

}
