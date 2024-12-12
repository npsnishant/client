import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './components/add-data/add-data.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: 'add-data/:id/:type', component: AddDataComponent},
  {path: 'add-data', component: AddDataComponent},
  {path: 'client-list', component: ClientListComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
