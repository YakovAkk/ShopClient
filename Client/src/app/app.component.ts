import { Component, Output } from '@angular/core';
import { AddLegToBaketModel } from './OtherLogic/Models/AddLegToBaketModel';
import { ItemInBasketDTO } from './OtherLogic/Models/ItemInBasketDTO';
import { LegoModel } from './OtherLogic/Models/LegoModel';
import { BasketService } from './OtherLogic/Services/BasketService';
import { LegoService } from './OtherLogic/Services/LegoService';
import { SendToMailService } from './OtherLogic/Services/SendToMailService';
import { LoginUserStorage } from './OtherLogic/StorageDataOfUser/LoginUserStorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private readonly _legoService : LegoService,
    private readonly _basketService : BasketService,
    private readonly _sendToMailService : SendToMailService ){
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
  BasketRespoce : any
  ItemForAddedInBasker : Array<AddLegToBaketModel> = []
  TotalPriceInBasket : number = 0
  private readonly _userStorage  = LoginUserStorage.getInstance()
  ShowBasket() : void{
    this.TotalPriceInBasket = 0
    this.ItemForAddedInBasker = []
    let user = this._userStorage.getUser()
    this._basketService.getAllItemsFromBasket().subscribe(respoce => {
      this.BasketRespoce = respoce
      //console.log("Responce : ", this.BasketRespoce);
      for (let item of this.BasketRespoce) {
        if(item.user.email == user.Email ){
          this.ItemForAddedInBasker.push(new AddLegToBaketModel (item.id,item.lego, item.user.email,item.amount))
          this.TotalPriceInBasket += item.lego.price
        }
        //console.log("item : ", item);
        
     }
    //console.log(this.ItemsInBasket);
    })

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

  DeleteItemFromBasket(item : AddLegToBaketModel) : void{
    console.log(item);
    this._basketService.deleteItemById(item.id).subscribe(responce => {
      this.RefreshBasket()
    })
  }

  RefreshBasket() : void{
    this.ShowBasket()
  }

  ContinueShopping() : void{
    this.CloseBasket()
    this.OnTrendClick()
  }

  MakeOrder():void{

    let listWithLego : string = "Your list of goods : "

    this.ItemForAddedInBasker.forEach(element => {
      listWithLego += 
      `Name : ${element.lego.name} \n 
      Price : ${element.lego.price} \n 
      Amount : ${element.amount} \n\n `
      });
      listWithLego += `Total price : ${this.TotalPriceInBasket}`
      console.log(listWithLego);
      
    // sent to email choose element
    this._sendToMailService.Send(listWithLego).subscribe(responce => {
      console.log(responce)
    })
    // delete all element frob basket

    this.ItemForAddedInBasker.forEach(element => {
      this.DeleteItemFromBasket(element)
    });

    // say "thank you for buying lego"
    alert("Thank you for buying lego")
  }

  popupState : string = ""
  messageForPopup : string = ""
  isShowPopup : boolean = false
  ClosePopupLogin() : void{
    this.isShowPopup = false
  }
  ShowPopupLogin() : void{
    this.messageForPopup = "You have been entered to your cabinet, successfully!"
    this.isShowPopup = true
    this.popupState = 'end'
  }

  
}
