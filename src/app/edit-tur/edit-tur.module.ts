import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTurPageRoutingModule } from './edit-tur-routing.module';

import { EditTurPage } from './edit-tur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTurPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditTurPage]
})
export class EditTurPageModule { }
