import { Component, Input, OnInit, Output } from '@angular/core';
import { LegoModel } from '../OtherLogic/Models/LegoModel';

@Component({
  selector: 'app-trendlego',
  templateUrl: './trendlego.component.html',
  styleUrls: ['./trendlego.component.css']
})
export class TrendlegoComponent implements OnInit {

  @Input()
  isShowTrendLego : boolean = false

  @Input()
  Lego : Array<LegoModel> = []
  
  constructor() { }

  ngOnInit(): void {
  }

}
