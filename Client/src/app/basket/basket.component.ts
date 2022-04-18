import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddLegToBaketModel } from '../OtherLogic/Models/AddLegToBaketModel';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  @Input()
  isShowComponent = false

  @Input()
  ItemsInBasket : Array<AddLegToBaketModel> = []

  @Input()
  TotalPrice : number = 0

  constructor() { }

  ngOnInit(): void {
    //console.log(this.ItemsInBasket);
  }

  @Output()
  CloseBasket = new EventEmitter()
  OnCloseBasket(){
    this.CloseBasket.emit()
  }

  @Output()
  OnDeleteItemFromBasket = new EventEmitter()
  onDeleteFromBasket(item : AddLegToBaketModel) : void{
    //console.log(item);
    this.OnDeleteItemFromBasket.emit(item)
  }

  @Output()
  onContinueShopping = new EventEmitter()
  contShopping() : void{
    this.onContinueShopping.emit()
  }
  @Output()
  onMakeOrder = new EventEmitter()
  OnMakeOrder() : void{
    this.onMakeOrder.emit()
  }

  @Output()
  addOneToAmountItem = new EventEmitter()
  AddItem(item : AddLegToBaketModel ) : void{
    this.addOneToAmountItem.emit(item)
  }

  @Output()
  minusOneFromAmountItem = new EventEmitter()
  minusItem(item : AddLegToBaketModel ) : void{
    this.minusOneFromAmountItem.emit(item)
  }
  
}
