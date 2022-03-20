import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-successful-popup',
  templateUrl: './successful-popup.component.html',
  styleUrls: ['./successful-popup.component.css']
})
export class SuccessfulPopupComponent implements OnInit {

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
