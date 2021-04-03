import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from './shopping.component';
import { LiveShoppingComponent } from './live-shopping/live-shopping.component';

const routes: Routes = [
  { path: '', component: ShoppingComponent },
  { path: 'live-shopping', component: LiveShoppingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
