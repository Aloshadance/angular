import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeroesListComponent} from "./entities/components/heroes-list/heroes-list.component";
import {EditHeroesComponent} from "./entities/components/edit-heroes/edit-heroes.component";


const routes: Routes = [
  { path: 'edit/:id', component: EditHeroesComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'heroes', component: HeroesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
