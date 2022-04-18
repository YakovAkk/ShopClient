import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AddLegToBaketModel } from '../OtherLogic/Models/AddLegToBaketModel';
import { CategoryModel } from '../OtherLogic/Models/CategoryModel';
import { LegoModel } from '../OtherLogic/Models/LegoModel';
import { UserModel } from '../OtherLogic/Models/UserModel';
import { BasketService } from '../OtherLogic/Services/BasketService';
import { LoginUserStorage } from '../OtherLogic/StorageDataOfUser/LoginUserStorage';

@Component({
  selector: 'app-lego-by-category',
  templateUrl: './lego-by-category.component.html',
  styleUrls: ['./lego-by-category.component.css']
})
export class LegoByCategoryComponent implements OnInit {
  private readonly _userStorage = LoginUserStorage.getInstance()
  @Input()
  isShowLegoByCategory = false

  @Input()
  Category = new CategoryModel(null,"","")
  @Input()
  Lego : Array<LegoModel> = []

  constructor(private readonly _basketService : BasketService ) { }

  ngOnInit(): void {
  }
  @Output()
  onShowWrongPopup = new EventEmitter() 
  @Output()
  onShowSuccessfullPopup = new EventEmitter() 
  BasketResponse : any

  OnBuyClick(item : LegoModel) : void{
    let user = this._userStorage.getUser()
    if( user.Email == "" && user.NickName == ""){
      //alert("Login please!")
      this.onShowWrongPopup.emit("You should enter to your account")
    }
    else{
      let AddToBaskretItem = new AddLegToBaketModel(null,item,user.Email)
      //console.log(AddToBaskretItem);
      this._basketService.additemToBasket(AddToBaskretItem).subscribe((response) => {
        this.BasketResponse = response;
        
        //console.log(response);
        if(this.BasketResponse == null){
          this.onShowWrongPopup.emit("The shopping cart has already contained the kit of lego")
          return
        }
        
        // console.log("Item : " ,AddToBaskretItem);
        // console.log("Responce Basket : " ,this.BasketResponse);
        //alert(item.name + "was added to Shoping cart")
        this.onShowSuccessfullPopup.emit(item.name + "was added to Shoping cart")
      })
    }
    
    // lego is written in database
    //console.log("lego is written in database");
    
  }

}
