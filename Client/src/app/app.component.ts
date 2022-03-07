import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Client';

  isShowHeader: boolean = true
  isShowSideBar : boolean = true

  ShowSideBar() : void{
      this.isShowSideBar = !this.isShowSideBar
  }
  ShowHeader() : void{
    this.isShowHeader = !this.isShowHeader
  }

  isShowLogin : boolean = false
  ShowLogin() : void{
    this.isShowLogin = !this.isShowLogin
    this.ShowSideBar()
    this.ShowHeader()
  }

  isShowRegistration : boolean = false
  ShowRegistration() : void{
    this.isShowRegistration = !this.isShowRegistration
    this.ShowSideBar()
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
