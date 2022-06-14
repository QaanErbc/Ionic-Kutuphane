import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'giris',
    pathMatch: 'full'
  },
  {
    path: 'giris',
    loadChildren: () => import('./giris/giris.module').then( m => m.GirisPageModule)
  },
  {
    path: 'kayit',
    loadChildren: () => import('./kayit/kayit.module').then( m => m.KayitPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'all-books',
    loadChildren: () => import('./all-books/all-books.module').then( m => m.AllBooksPageModule)
  },
  {
    path: 'add-book',
    loadChildren: () => import('./add-book/add-book.module').then( m => m.AddBookPageModule)
  },
  {
    path: 'my-books',
    loadChildren: () => import('./my-books/my-books.module').then( m => m.MyBooksPageModule)
  },
  {
    path: 'all-turler',
    loadChildren: () => import('./all-turler/all-turler.module').then( m => m.AllTurlerPageModule)
  },
  {
    path: 'add-tur',
    loadChildren: () => import('./add-tur/add-tur.module').then( m => m.AddTurPageModule)
  },
  {
    path: 'edit-book',
    loadChildren: () => import('./edit-book/edit-book.module').then( m => m.EditBookPageModule)
  },
  {
    path: 'edit-tur',
    loadChildren: () => import('./edit-tur/edit-tur.module').then( m => m.EditTurPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
