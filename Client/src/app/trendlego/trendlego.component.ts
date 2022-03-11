import { Component, Input, OnInit, Output } from '@angular/core';
import { LegoModel } from '../OtherLogic/Models/LegoModel';

@Component({
  selector: 'app-trendlego',
  templateUrl: './trendlego.component.html',
  styleUrls: ['./trendlego.component.css']
})
export class TrendlegoComponent implements OnInit {

  @Input()
  isShowTrendLego = false

  @Input()
  Lego : Array<LegoModel> = []
  
  constructor() { }

  ngOnInit(): void {
  }
  OnBuyClick(item : LegoModel){
    // lego is written in database
    console.log("lego is written in database");
    
  }


}
