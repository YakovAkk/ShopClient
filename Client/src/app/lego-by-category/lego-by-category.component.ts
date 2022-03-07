import { Component, Input, OnInit } from '@angular/core';
import { CategoryModel } from '../OtherLogic/Models/CategoryModel';
import { LegoModel } from '../OtherLogic/Models/LegoModel';

@Component({
  selector: 'app-lego-by-category',
  templateUrl: './lego-by-category.component.html',
  styleUrls: ['./lego-by-category.component.css']
})
export class LegoByCategoryComponent implements OnInit {

  @Input()
  isShowLegoByCategory : boolean = false

  @Input()
  Category : CategoryModel = new CategoryModel(null,"","")
  @Input()
  Lego : Array<LegoModel> = []

  constructor() { }

  ngOnInit(): void {
  }

}
