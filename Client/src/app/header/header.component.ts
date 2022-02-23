import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  isShowSideBar : boolean = false

  @Output()
  onShowSideBar = new EventEmitter() 

  ShowSideBar() : void{
    this.isShowSideBar = !this.isShowSideBar;
    this.onShowSideBar.emit()
  }


  constructor() { }

  ngOnInit(): void {
  }
  
}
