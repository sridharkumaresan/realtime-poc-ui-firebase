import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { DataGridComponent } from './data-grid/data-grid.component';

const routes: Routes = [
  { path: 'add', component: AddItemComponent},
  { path: 'list', component: DataGridComponent},
  { path: '', redirectTo: '/list', pathMatch: 'full'},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
