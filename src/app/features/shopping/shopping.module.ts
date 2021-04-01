import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShoppingComponent],
  imports: [CommonModule, RouterModule, LiveShoppingRoutingModule],
  exports: [RouterModule],
})
export class LiveShoppingModule {}
