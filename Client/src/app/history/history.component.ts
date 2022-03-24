import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddLegToBaketModel } from '../OtherLogic/Models/AddLegToBaketModel';
import { HistoryOrder } from '../OtherLogic/Models/HistoryOrder';
import { UsersHistoryModel } from '../OtherLogic/Models/UsersHistoryModel';
import { LoginUserStorage } from '../OtherLogic/StorageDataOfUser/LoginUserStorage';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  private readonly _userStorage  = LoginUserStorage.getInstance()
  @Input()
  HistoryList : UsersHistoryModel = new UsersHistoryModel(this._userStorage.getUser(),
  new Array<HistoryOrder>())
  
  constructor() { }

  ngOnInit(): void {
  }

  @Output()
  OnCloseEvent = new EventEmitter()

  Close() : void{
    this.OnCloseEvent.emit()
  }

}
