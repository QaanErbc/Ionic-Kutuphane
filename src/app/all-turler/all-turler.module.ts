import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllTurlerPageRoutingModule } from './all-turler-routing.module';

import { AllTurlerPage } from './all-turler.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllTurlerPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AllTurlerPage]
})
export class AllTurlerPageModule { }
