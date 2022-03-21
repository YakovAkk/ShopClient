import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-successful-popup',
  templateUrl: './successful-popup.component.html',
  styleUrls: ['./successful-popup.component.css'],
  animations : [
    trigger('PopupAnimation' , [
      state('start',style({
       position : 'fixed',
       top : '0',
       bottom: '0',
       left: '0',
       right: '0',
       transform: 'translate(100%,100%)'
      })),
      state('end',style({
        position : 'fixed',
        top : '0',
        bottom: '0',
        left: '0',
        right: '0',
        transform: 'translate(400px,450px)'

      })),
      transition('start => end',animate(50000))
    ])
  ]
})
export class SuccessfulPopupComponent implements OnInit {

  @Input()
  popupState : string = 'start'
  @Output()
  onClosePopup = new EventEmitter()
  ClosePopup() : void
  {
    this.onClosePopup.emit()
  }

  @Input()
  Message : string = ""

  constructor() { }

  ngOnInit(): void {
    this.popupState = 'end'
    console.log("aaaaaaaaa")
  }

}
