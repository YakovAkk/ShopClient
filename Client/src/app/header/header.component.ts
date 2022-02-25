import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  isShowComponent : boolean = true


  isShowSideBar : boolean = false

  @Output()
  onShowSideBar = new EventEmitter() 

  ShowSideBar() : void{
    this.isShowSideBar = !this.isShowSideBar;
    this.onShowSideBar.emit()
  }

  isShowLogin : boolean = false

  @Output()
  onShowLogin = new EventEmitter() 

  ShowLogin() : void{
    this.isShowLogin = !this.isShowLogin;
    this.onShowLogin.emit()
  }

  isShowRegistration : boolean = false
  @Output()
  onShowRegistration = new EventEmitter() 

  ShowRegistration() : void{
    this.isShowRegistration = !this.isShowRegistration;
    this.onShowRegistration.emit()
  }
  constructor() { }

  ngOnInit(): void {
  }
  
}
