import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllTurlerPage } from './all-turler.page';

const routes: Routes = [
  {
    path: '',
    component: AllTurlerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllTurlerPageRoutingModule {}
