import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'currency', 
    loadChildren: () => import(`./currency/currency.module`).then(m => m.CurrencyModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
