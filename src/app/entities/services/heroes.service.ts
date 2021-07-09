import { Injectable } from '@angular/core';
import { Hero } from "../interfaces/hero";
import { BehaviorSubject, Observable } from "rxjs";
import { IdName } from "../interfaces/id-name.interface";
import {EditHeroesComponent} from "../components/edit-heroes/edit-heroes.component";
import {MatDialog} from "@angular/material/dialog";
import {FilterData} from "../interfaces/filter-data";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private _foundHeroId$$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public foundHeroId$: Observable<number> = this._foundHeroId$$.asObservable();

  private defaultHero = {id: 0, name: '', skill: [], power: 0, level: 0};
  private defaultFilter = {name: '', fromLevel: 0, toLevel: 0, sortLevel: false, skill: []};

  private _heroes$$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);

  private _filteredHeroes$$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  public filteredHeroes$: Observable<Hero[]> = this._filteredHeroes$$.asObservable();

  private _selectedHero$$: BehaviorSubject<Hero> = new BehaviorSubject<Hero>(this.defaultHero);
  public selectedHero$: Observable<Hero> = this._selectedHero$$.asObservable();

  private _skills$$: BehaviorSubject<IdName[]> = new BehaviorSubject<IdName[]>([]);
  public skills$: Observable<IdName[]> = this._skills$$.asObservable();

  private _filterData$$: BehaviorSubject<FilterData> = new BehaviorSubject<FilterData>(this.defaultFilter);

  constructor(public dialog: MatDialog) {}

  private sendHttpRequest = (method: string, url: string, data: any) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.responseType = 'json';
      if (data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response);
        } else {
          resolve(xhr.response);
        }
      };
      xhr.onerror = () => {
        reject(xhr.response);
      };
      xhr.send(JSON.stringify(data));
    });
  }

  public getHeroes(): void {
    this.sendHttpRequest('GET', 'http://127.0.0.1:3000/heroes', {}).then((responseData) => {
      const heroes = JSON.parse(JSON.stringify(responseData));
      this._heroes$$.next(heroes);
      this._filteredHeroes$$.next(heroes);
    }).catch(err => {
      console.log(err);
    })
  }

  public addHero(hero: Hero): void {
    const heroes = this._heroes$$.value;
    this.sendHttpRequest('POST', 'http://127.0.0.1:3000/heroes', {
      id: this.genId(heroes),
      name: hero.name,
      power: hero.power,
      skill: hero.skill,
      level: hero.level
    }).then((responseData) => {
      console.log(responseData);
      heroes.push(JSON.parse(JSON.stringify(responseData)));
      this._heroes$$.next(heroes);
      this.filterHeroes();
    }).catch(err => {
      console.log(err);
    })
  }

  public deleteHero(heroId: number): void {
    this.sendHttpRequest('DELETE', `http://127.0.0.1:3000/heroes/${heroId}`, {}).then(responseData => {
      const heroes = this._heroes$$.value;
      const heroesWithOutDeletedHero = heroes.filter((hero: Hero) => hero.id !== heroId);
      this._heroes$$.next(heroesWithOutDeletedHero);
      this._filteredHeroes$$.next(heroesWithOutDeletedHero);
    }).catch(err => {
      console.log(err);
    })
  }

  public updateHero(hero: Hero): void {
    this.sendHttpRequest('PUT', `http://127.0.0.1:3000/heroes/${hero.id}`, {
      id: hero.id,
      name: hero.name,
      power: hero.power,
      skill: hero.skill,
      level: hero.level
    }).then(responseData => {
      const heroes = this._heroes$$.value;
      const foundIndex = heroes.findIndex((hero: Hero) => (hero.id === this._foundHeroId$$.value));
      heroes.splice(foundIndex, 1, hero);
      this._heroes$$.next(heroes);
      this.filterHeroes();
    }).catch(err => {
      console.log(err);
    })
  }

  public getSkills(): void {
    this.sendHttpRequest('GET', 'http://127.0.0.1:3000/skills', {}).then((responseData) => {
      const skills = JSON.parse(JSON.stringify(responseData));
      this._skills$$.next(skills);
    }).catch(err => {
      console.log(err);
    })
  }

  public addSkill(skill: IdName): void {
    const skills = this._skills$$.value;
    this.sendHttpRequest('POST', 'http://127.0.0.1:3000/skills', {
      id: this.genId(skills),
      name: skill.name
    }).then((responseData) => {
      skills.push(JSON.parse(JSON.stringify(responseData)));
      this._skills$$.next(skills);
    }).catch(err => {
      console.log(err);
    })
  }

  public genId(variable: any): number {
    return variable.length + 1;
  }

  public setSelectedHero(hero: Hero): void {
    this._selectedHero$$.next(hero);
    this._foundHeroId$$.next(hero.id);
    this.dialog.open(EditHeroesComponent);
  }

  public setFilterValue(variable: FilterData): void {
    this._filterData$$.next(variable);
  }

  public filterHeroes(): void {
    const variable = this._filterData$$.value;
    const heroes = this._heroes$$.value;
    const filteredHeroes = heroes.filter(item =>
      ((!variable.fromLevel || item.level >= variable.fromLevel)
      && (!variable.toLevel || item.level <= variable.toLevel)
      && (!variable.name
      || item.name.toLowerCase().indexOf(variable.name.toLowerCase()) > -1
      || item.name.toUpperCase().indexOf(variable.name.toUpperCase()) > -1)
      && (!variable.skill.length || (JSON.stringify(variable.skill) === JSON.stringify(item.skill)))
      ));
    this.sortHeroes(filteredHeroes);
  }

  public sortHeroes(filteredHeroes: Hero[]): void {
    const variable = this._filterData$$.value;
    let sortedHeroes: Hero[];
    if (variable.sortLevel) {
      sortedHeroes = filteredHeroes.sort((a, b) => b.level - a.level);
    } else {
      sortedHeroes = filteredHeroes.sort((a,b) => a.id - b.id);
    }
    this._filteredHeroes$$.next(sortedHeroes);
  }

}
