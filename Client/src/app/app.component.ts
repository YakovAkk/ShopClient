import { Component, Output } from '@angular/core';
import { AddLegToBaketModel } from './OtherLogic/Models/AddLegToBaketModel';
import { HistoryModel } from './OtherLogic/Models/HistoryModel';
import { HistoryOrder } from './OtherLogic/Models/HistoryOrder';
import { ItemInBasketDTO } from './OtherLogic/Models/ItemInBasketDTO';
import { LegoModel } from './OtherLogic/Models/LegoModel';
import { UserModel } from './OtherLogic/Models/UserModel';
import { UsersHistoryModel } from './OtherLogic/Models/UsersHistoryModel';
import { BasketService } from './OtherLogic/Services/BasketService';
import { HistoryService } from './OtherLogic/Services/HistoryService';
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
    private readonly _sendToMailService : SendToMailService,
    private readonly _historyService : HistoryService
    ){
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
 
  // ----------------------------------------------------- BASKET --------------------------------------------------------
  isShowBasket : boolean = false
  BasketRespoce : any
  ItemForAddedInBasket : Array<AddLegToBaketModel> = []
  TotalPriceInBasket : number = 0
  private readonly _userStorage  = LoginUserStorage.getInstance()
  ShowBasket() : void{
    this.TotalPriceInBasket = 0
    this.ItemForAddedInBasket = []
    let user = this._userStorage.getUser()
    this._basketService.getAllItemsFromBasket().subscribe(respoce => {
      this.BasketRespoce = respoce
      //console.log("Responce : ", this.BasketRespoce);
      for (let item of this.BasketRespoce) {
        if(item.user.email == user.Email ){
          this.ItemForAddedInBasket.push(new AddLegToBaketModel (item.id,item.lego, item.user.email,item.amount))
          this.TotalPriceInBasket += item.lego.price * item.amount
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

    this.SaveBaksetInDB()
  }

  SaveBaksetInDB() : void{
    this._basketService.SaveChanges(this.ItemForAddedInBasket)
  }

  DeleteItemFromBasket(item : AddLegToBaketModel) : void{
    //console.log(item);
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

    this.ItemForAddedInBasket.forEach(element => {
      listWithLego += 
      `Name : ${element.lego.name} \n 
      Price : ${element.lego.price} \n 
      Amount : ${element.amount} \n\n `
      });
      listWithLego += `Total price : ${this.TotalPriceInBasket}`
      //console.log(listWithLego);
    
    // Write to History

    let historyModel = new HistoryModel(this._userStorage.getUser().Email,this.ItemForAddedInBasket)

      this._historyService.addToUsersHistory(historyModel).subscribe(responce =>{
        //console.log(responce);
        
      })

    // sent to email choose element
    this._sendToMailService.Send(listWithLego).subscribe(responce => {
      //console.log(responce)
    })
    // delete all element from basket

    this.ItemForAddedInBasket.forEach(element => {
      this.DeleteItemFromBasket(element)
    });



    // say "thank you for buying lego"
    //alert("Thank you for buying lego")
    this.ShowSuccessfullPopup("Order was sent, check your mail!")
  }

  nimusOne(item : AddLegToBaketModel) : void {
    if(item.amount > 1){
      item.amount -= 1
    }
    
    //console.log(item);
  }
  addOne(item : AddLegToBaketModel) : void{
    item.amount += 1
    //console.log(item);
    // this._basketService.
  }

// ----------------------------------------------------- END CODE BASKET ---------------------------------------------------


//------------------------------------------------------- POPUP ------------------------------------------------------------
  popupState : string = ""
  messageForPopup : string = ""
  isShowPopup : boolean = false
  CloseSuccessfullPopup() : void{
    this.popupState = 'start'
    this.isShowPopup = false
  }
  ShowSuccessfullPopup(message : string) : void{
    this.popupState = 'start'
    this.messageForPopup = message
    this.isShowPopup = true
    setTimeout(() => {
      this.popupState = 'end'
    },1000)
   
  }

  wrongPopupState : string = ""
  messageForWrongPopup : string = ""
  isShowWrongPopup : boolean = false
  ShowWrongPopup(message : string) : void{
    
    this.wrongPopupState = 'start'
    this.messageForWrongPopup = message
      this.isShowWrongPopup = true
    setTimeout(() => {
      this.wrongPopupState = 'end'
    },1000)
   
  }
  CloseWrongPopup() : void{
    this.wrongPopupState = 'start'
    this.isShowWrongPopup = false
  }

//-------------------------------------------------------END POPUP ----------------------------------------------------------

  isShowHistory : boolean = false

  historyList : UsersHistoryModel = new UsersHistoryModel(this._userStorage.getUser(),
  new Array<HistoryOrder>())

  OnHistoryClick() : void{
    if(this._userStorage.getUser().Email == ""){
      this.ShowWrongPopup("You should login!")
      return
    }

    let historyList : UsersHistoryModel
    let ordersList : Array<HistoryOrder> = []
    this._historyService.getAll().subscribe( (responce : any) =>{

      //console.log(responce);

      responce.forEach((element : any) => {

        if(element.user.email == this._userStorage.getUser().Email){
            element.orders.forEach((order : any) => {
              let myOrder = new HistoryOrder(
                new AddLegToBaketModel(null,order.lego,order.user.email,order.amount),
                order.dateDeal
                )
              //console.log(myOrder);
              ordersList.push(myOrder)
            });
            historyList = new UsersHistoryModel(
              new UserModel(element.user.nickName,element.user.email,element.user.rememberMe),ordersList
              )
        }
      })

      //console.log("---------------------------------------");
      
      historyList.orders.forEach(element => {
        console.log(element.date.toString());
        console.log(element.date.getTime);
      });
      this.historyList = historyList
      //console.log("AAAAA : ",historyList);
    })
    

    this.isShowHistory = true
    this.isShowHeader = false
    this.isShowSideBar = false
  }

  OnCloseHistory() : void{
    this.isShowHistory = false
    this.isShowHeader = true
    this.isShowSideBar = true
  }
}
