import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LegoModel } from '../OtherLogic/Models/LegoModel';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  @Input()
  isShowComponent : boolean = false

  LegoInBasket : Array<LegoModel> = []

  constructor() { }

  ngOnInit(): void {
  }

  @Output()
  CloseBasket = new EventEmitter()
  OnCloseBasket(){
    this.CloseBasket.emit()
  }
}
