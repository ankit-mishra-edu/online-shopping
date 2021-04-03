import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const featuresRoutes: Routes = [
  {
    path: 'shopping',
    loadChildren: () =>
      import('./shopping/shopping.module').then((m) => m.ShoppingModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(featuresRoutes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
