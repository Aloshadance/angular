import { Injectable } from '@angular/core';
import { Hero } from "../interfaces/hero";
import { BehaviorSubject, Observable } from "rxjs";
import { IdName } from "../interfaces/id-name.interface";
import {Heroes} from "../mocks/heroes.mock";
import {Skills} from "../mocks/skills.mock";
import {EditHeroesComponent} from "../components/edit-heroes/edit-heroes.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  public heroes: Hero[] = [];
  public skills: IdName[] = [];

  private defaultHero = {id: 0, name: '', skill: [], power: 0, level: 0};

  private _heroes$$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>(Heroes);
  public heroes$: Observable<Hero[]> = this._heroes$$.asObservable();

  private _selectedHero$$: BehaviorSubject<Hero> = new BehaviorSubject<Hero>(this.defaultHero);
  public selectedHero$: Observable<Hero> = this._selectedHero$$.asObservable();

  private _skills$$: BehaviorSubject<IdName[]> = new BehaviorSubject<IdName[]>(Skills);
  public skills$: Observable<IdName[]> = this._skills$$.asObservable();

  constructor(public dialog: MatDialog) { }

  public getHeroes(): void {
    this.heroes$.subscribe((items: Hero[]) => {
      this.heroes = items;
    })
  }

  public getSkills(): void {
    this.skills$.subscribe((items: IdName[]) => {
      this.skills = items;
    })
  }

  public genId(variable: any): number {
    return variable.length + 1;
  }

  public getHero(id: number): void {

  }

  public addHero(hero: Hero): void {
    this._heroes$$.subscribe((items: Hero[]) => {
      hero.id = this.genId(this.heroes);
      this.heroes.push(hero);
    })
  }

  public addSkill(skill: IdName): void {
    this._skills$$.subscribe((items: IdName[]) => {
      skill.id = this.genId(this.skills);
      this.skills.push(skill);
    });
  }

  // public updateHero(array: Hero[]): void {
  //   this._heroes$$.next(array);
  // }

  // public setSelectedHero(hero: Hero): Hero {
  //   return this.heroes.find(item => item.id === hero.id);
  // }

  public openDialog(hero: Hero): void {
    this.dialog.open(EditHeroesComponent);
    // this.setSelectedHero(hero);
  }

  }
