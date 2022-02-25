import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

}
