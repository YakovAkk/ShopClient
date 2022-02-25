import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Input()
  isShowComponent : boolean = false
  constructor() { }


  @Output()
  onClose = new EventEmitter() 

  Close() : void{
    this.onClose.emit()
  }
  
  ngOnInit(): void {
  }

}
