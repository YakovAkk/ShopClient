import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemInBasketDTO } from '../OtherLogic/Models/ItemInBasketDTO';
import { LegoModel } from '../OtherLogic/Models/LegoModel';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  @Input()
  isShowComponent = false

  @Input()
  ItemsInBasket : Array<ItemInBasketDTO> = []

  constructor() { }


  ngOnInit(): void {
    console.log(this.ItemsInBasket);
    
  }

  @Output()
  CloseBasket = new EventEmitter()
  OnCloseBasket(){
    this.CloseBasket.emit()
  }
}
