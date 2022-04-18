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
       transform: 'translate(1200px,400px)'
      })),
      state('end',style({
        position : 'fixed',
        top : '0',
        bottom: '0',
        left: '0',
        right: '0',
        transform: 'translate(300px,350px)'

      })),
      transition('start => end',animate(1000)),
      transition('end => start',animate(1000))
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

  }

}
