import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroesService } from "../../services/heroes.service";
import {IdName} from "../../interfaces/id-name.interface";

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})

export class HeroesListComponent implements OnInit {
  public heroes: Hero[] = [];
  public skills: IdName[] = [];

  constructor(private _service: HeroesService) { }

  ngOnInit() {
    this.getHeroes();
    this.getSkills();
  }

  public getHeroes(): void {
    this._service.getHeroes();
    this._service.heroes$.subscribe((items: Hero[]) => {
      this.heroes = items;
    })
  }

  public getSkills(): void {
    this._service.getSkills();
    this._service.skills$.subscribe((items: IdName[]) => {
      this.skills = items;
    })
  }

  public openDialog(hero: Hero): void {
   this._service.openDialog(hero);
  }

}

