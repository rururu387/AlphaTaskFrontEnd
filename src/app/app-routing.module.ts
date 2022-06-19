import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyRateMemeComponent } from './currency-rate-meme/currency-rate-meme.component';

const routes: Routes = [
    { path: "", component: CurrencyRateMemeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
