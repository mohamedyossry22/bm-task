import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterComponent } from './components/converter/converter.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  {
    path:'convert',
    component:ConverterComponent
  },
  {
    path:'details',
    component:DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule { }
