import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    InputComponent,
    SelectComponent
  ],
  exports:[
    NavbarComponent,
    InputComponent,
    SelectComponent,
    MaterialModule
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    
    FormsModule,
    RouterModule,
    HttpClientModule,
    CommonModule
  ]
})
export class SharedModule { }
