import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { CategoriesComponent } from './categories/categories.component';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FormsModule } from '@angular/forms';

import { LegoByCategoryComponent } from './lego-by-category/lego-by-category.component';
import { CategoryService } from './OtherLogic/Services/CategoryService';
import { LegoService } from './OtherLogic/Services/LegoService';
import { UserService } from './OtherLogic/Services/UserService';
import { TrendlegoComponent } from './trendlego/trendlego.component';
@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    HeaderComponent,
    CategoriesComponent,
    LoginFormComponent,
    RegisterFormComponent,
    LegoByCategoryComponent,
    TrendlegoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule  
  ],
  providers: [CategoryService,LegoService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
