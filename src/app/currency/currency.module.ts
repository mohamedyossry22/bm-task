import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyRoutingModule } from './currency-routing.module';
import { ConverterComponent } from './components/converter/converter.component';
import { DetailsComponent } from './components/details/details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ConverterComponent,
    DetailsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    CurrencyRoutingModule
  ]
})
export class CurrencyModule { }
