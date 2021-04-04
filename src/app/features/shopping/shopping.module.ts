import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';
import { RouterModule } from '@angular/router';
import { LiveShoppingComponent } from './live-shopping/live-shopping.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShoppingComponent, LiveShoppingComponent],
  imports: [CommonModule, FormsModule, RouterModule, ShoppingRoutingModule],
  exports: [RouterModule],
})
export class ShoppingModule {}
