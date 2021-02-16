import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Módulos
import { EntryRoutingModule } from './entry/entry.routing';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), EntryRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
