import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddHeroesComponent } from './entities/components/add-heroes/add-heroes.component';
import { AddSkillsComponent } from './entities/components/add-skills/add-skills.component';
import { FilterHeroesComponent } from './entities/components/filter-heroes/filter-heroes.component';
import { HeroesListComponent } from './entities/components/heroes-list/heroes-list.component';
import { EditHeroesComponent } from './entities/components/edit-heroes/edit-heroes.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";
import {HeroesService} from "./entities/services/heroes.service";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    AddHeroesComponent,
    AddSkillsComponent,
    FilterHeroesComponent,
    HeroesListComponent,
    EditHeroesComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatButtonToggleModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatCardModule,
        ReactiveFormsModule,
        MatDialogModule
    ],
  providers: [
    HeroesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
