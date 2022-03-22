import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddLegToBaketModel } from '../OtherLogic/Models/AddLegToBaketModel';
import { LegoModel } from '../OtherLogic/Models/LegoModel';
import { BasketService } from '../OtherLogic/Services/BasketService';
import { LoginUserStorage } from '../OtherLogic/StorageDataOfUser/LoginUserStorage';
@Component({
  selector: 'app-trendlego',
  templateUrl: './trendlego.component.html',
  styleUrls: ['./trendlego.component.css']
})
export class TrendlegoComponent implements OnInit {

  private readonly _userStorage = LoginUserStorage.getInstance()

  @Input()
  isShowTrendLego = false

  @Input()
  Lego : Array<LegoModel> = []
  
  constructor(private readonly _basketService : BasketService) { }
  BasketResponse : any
  ngOnInit(): void {
  }

  @Output()
  onShowWrongPopup = new EventEmitter() 
  @Output()
  onShowSuccessfullPopup = new EventEmitter() 
  OnBuyClick(item : LegoModel){
    let user = this._userStorage.getUser()
    if( user.Email == "" && user.NickName == ""){
      this.onShowWrongPopup.emit("You should enter to your account")
    }
    else{
      let AddToBaskretItem = new AddLegToBaketModel(null,item,user.Email)
      console.log(AddToBaskretItem);
      this._basketService.additemToBasket(AddToBaskretItem).subscribe((response) => {
        this.BasketResponse = response;
        
        // console.log("Item : " ,AddToBaskretItem);

        // console.log("Responce Basket : " ,this.BasketResponse);

        this.onShowSuccessfullPopup.emit(item.name + "was added to Shoping cart")
        //alert(item.name + "was added to Shoping cart")
      })
    }

   
    //console.log("lego is written in database");
    
  }


}
