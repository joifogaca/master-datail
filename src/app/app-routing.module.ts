import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { CategoriesModule } from './pages/categories/categories-routing.module'


const routes: Routes = [
  { path: 'categories', loadChildren: () => import('./pages/categories/categories.module').then(mod => mod.CategoriesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
