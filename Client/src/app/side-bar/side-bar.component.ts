import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Input()
  isShowSideBar : boolean = true
  constructor() { }

  ngOnInit(): void {
  }

  @Output()
  HomeClickEvent = new EventEmitter() 

  OnHomeClick(){
    this.HomeClickEvent.emit()
  }
  @Output()
  TrendClickEvent = new EventEmitter() 
  OnTrendiClick(){
    this.TrendClickEvent.emit()
  }
}
