import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTurPageRoutingModule } from './add-tur-routing.module';

import { AddTurPage } from './add-tur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTurPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddTurPage]
})
export class AddTurPageModule {}
