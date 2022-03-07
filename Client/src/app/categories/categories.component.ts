import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { CategoryModel } from '../OtherLogic/Models/CategoryModel';
import { CategoryService } from '../OtherLogic/Services/CategoryService';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
@Injectable()
export class CategoriesComponent implements OnInit {

  Categories : Array<CategoryModel> = []

  constructor(private _categoryService : CategoryService) { }

  CategoryResponse : any

  ngOnInit(): void {
    this._categoryService.getCategories().subscribe((response) => {
      this.CategoryResponse = response;

       for (let item of this.CategoryResponse) {
          this.Categories.push(new CategoryModel(item.id,item.name,item.imageUrl))
       }
       
    })
  }

  ChoosenCategory : CategoryModel = new CategoryModel(null,"","")

  @Input()
  isShowCategories : boolean = true

  @Output()
  onChooseCategory = new EventEmitter()

  OnClick(name : string) : void{
     this.ChoosenCategory = this.Categories.filter(n => n.name == name)[0]
     this.onChooseCategory.emit( this.ChoosenCategory)
    //console.log(this.ChoosenCategory)
  }

}


