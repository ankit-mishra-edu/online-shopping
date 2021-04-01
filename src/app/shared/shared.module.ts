import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingNavbarComponent } from './components/shopping-navbar/shopping-navbar.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    LeftSidebarComponent,
    SearchBoxComponent,
    ShoppingNavbarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedRoutingModule,
  ],
  exports: [
    SpinnerComponent,
    LeftSidebarComponent,
    SearchBoxComponent,
    ShoppingNavbarComponent,
  ],
})
export class SharedModule {}
