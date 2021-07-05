import { Injectable } from '@angular/core';
import { Hero } from "../interfaces/hero";
import { BehaviorSubject, Observable } from "rxjs";
import { IdName } from "../interfaces/id-name.interface";
import {Heroes} from "../mocks/heroes.mock";
import {Skills} from "../mocks/skills.mock";
import {EditHeroesComponent} from "../components/edit-heroes/edit-heroes.component";
import {MatDialog} from "@angular/material/dialog";
import {FilterData} from "../interfaces/filter-data";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  public heroes: Hero[] = [];
  public skills: IdName[] = [];
  public foundIdHero: number = 0;
  public filteredHeroes: Hero[] = [];

  private defaultHero = {id: 0, name: '', skill: [], power: 0, level: 0};

  private _heroes$$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>(Heroes);
  public heroes$: Observable<Hero[]> = this._heroes$$.asObservable();

  private _filteredHeroes$$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>(Heroes);
  public filteredHeroes$: Observable<Hero[]> = this._filteredHeroes$$.asObservable();

  private _selectedHero$$: BehaviorSubject<Hero> = new BehaviorSubject<Hero>(this.defaultHero);
  public selectedHero$: Observable<Hero> = this._selectedHero$$.asObservable();

  private _skills$$: BehaviorSubject<IdName[]> = new BehaviorSubject<IdName[]>(Skills);
  public skills$: Observable<IdName[]> = this._skills$$.asObservable();

  constructor(public dialog: MatDialog) { }

  public getHeroes(): void {
    this.heroes$.subscribe((items: Hero[]) => {
      this.heroes = items;
    })
    this.filteredHeroes = this.heroes.slice();
    // this.filteredHeroes$.subscribe((items: Hero[]) => {
    //   this.filteredHeroes = items;
    // })
  }

  public getSkills(): void {
    this.skills$.subscribe((items: IdName[]) => {
      this.skills = items;
    })
  }

  public genId(variable: any): number {
    return variable.length + 1;
  }

  public addHero(hero: Hero): void {
    this._heroes$$.subscribe((items: Hero[]) => {
      hero.id = this.genId(this.heroes);
      this.heroes.push(hero);
    })
    this.filteredHeroes = this.heroes.slice();
  }

  public addSkill(skill: IdName): void {
    this._skills$$.subscribe((items: IdName[]) => {
      skill.id = this.genId(this.skills);
      this.skills.push(skill);
    });
  }

  public updateHero(hero: Hero): void {
    this._selectedHero$$.next(hero);
    this._heroes$$.subscribe((items: IdName[]) => {
      this.heroes.splice(this.foundIdHero - 1, 1, hero);
    });
    this.filteredHeroes.splice(this.foundIdHero - 1, 1, hero);
  }

  public setSelectedHero(hero: Hero): void {
    this._selectedHero$$.next(hero);
    this.foundIdHero = hero.id;
    this.dialog.open(EditHeroesComponent);
  }

  public filterHeroes(variable: FilterData): void {
     this.filteredHeroes = this.heroes.filter(item =>
      (!variable.fromLevel || item.level >= variable.fromLevel)
       && (!variable.toLevel || item.level <= variable.toLevel)
       && (!variable.name
        || item.name.toLowerCase().indexOf(variable.name.toLowerCase()) > -1
        || item.name.toUpperCase().indexOf(variable.name.toUpperCase()) > -1)
    );
    this._filteredHeroes$$.next(this.filteredHeroes);
  }

  // public sortHeroes(variable: FilterData): boolean {
  //   if (variable.sortLevel) {
  //     this.heroes.sort((a, b) => a.level - b.level);
  //     return true;
  //   } else {
  //     this.heroes.sort((a,b) => b.level - a.level);
  //     return false;
  //   }
  // }
}
