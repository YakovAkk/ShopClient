import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { UserLogin } from '../Models/UserLogin';
import { UserService } from '../Services/UserService';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {
  @Input()
  isShowComponent : boolean = false

  @Output()
  onClose = new EventEmitter() 

  Close() : void{
    this.onClose.emit()
  }

  constructor() { }

  ngOnInit(): void {
  }

  private UserModel : UserLogin = new UserLogin("","")

  userEmail : string = ""
  userPassword : string = ""

  OnClick() : void{

  }

}
