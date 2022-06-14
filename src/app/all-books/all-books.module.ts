import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllBooksPageRoutingModule } from './all-books-routing.module';

import { AllBooksPage } from './all-books.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllBooksPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AllBooksPage]
})
export class AllBooksPageModule {}
