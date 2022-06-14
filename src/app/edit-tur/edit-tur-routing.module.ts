import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTurPage } from './edit-tur.page';

const routes: Routes = [
  {
    path: '',
    component: EditTurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTurPageRoutingModule {}
