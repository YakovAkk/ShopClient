import { Component, Injectable, OnInit } from '@angular/core';
import { CategoryModel } from '../Models/CategoryModel';
import { CategoryService } from '../Services/CategoryService';

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
}


