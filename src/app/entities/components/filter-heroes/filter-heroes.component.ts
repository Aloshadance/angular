import { Component, OnInit } from '@angular/core';
import {IdName} from "../../interfaces/id-name.interface";
import {HeroesService} from "../../services/heroes.service";
import {FormControl, FormGroup} from "@angular/forms";
import {HeroesDetailEnum} from "../../enums/heroes-detail.enum";
import {Hero} from "../../interfaces/hero";

@Component({
  selector: 'app-filter-heroes',
  templateUrl: './filter-heroes.component.html',
  styleUrls: ['./filter-heroes.component.scss']
})
export class FilterHeroesComponent implements OnInit {
  public skills: IdName[] = [];
  public heroes: Hero[] = [];

  constructor(private _service: HeroesService) {
  }

  public filterHeroesForm: FormGroup = new FormGroup({
    [HeroesDetailEnum.NAME]: new FormControl(''),
    [HeroesDetailEnum.SKILL]: new FormControl([]),
    [HeroesDetailEnum.FROMLEVEL]: new FormControl(1),
    [HeroesDetailEnum.TOLEVEL]: new FormControl(),
    [HeroesDetailEnum.SORTLEVEL]: new FormControl()
  })

  ngOnInit(): void {
    this.getSkills();
    this.getHeroes();
    this.filterHeroesForm.valueChanges.subscribe(value => console.log(value));
  }

  public getSkills(): void {
    this._service.getSkills();
    this._service.skills$.subscribe((items: IdName[]) => {
      this.skills = items;
    })
  }

  public getHeroes(): void {
    this._service.getHeroes();
    this._service.heroes$.subscribe((items: Hero[]) => {
      this.heroes = items;
    })
  }


  public filterHeroes(): void {
    const filteredHeroes = this.heroes.filter(item => (
      (!this.filterHeroesForm.get('fromLevel')?.value || item.level >= this.filterHeroesForm.get('fromLevel')?.value) &&
      (!this.filterHeroesForm.get('toLevel')?.value || item.level <= this.filterHeroesForm.get('toLevel')?.value) &&
      (!this.filterHeroesForm.get('skill')?.value || item.skill === this.filterHeroesForm.get('skill')?.value) &&
      (!this.filterHeroesForm.get('name')?.value || item.name.toLowerCase().indexOf(this.filterHeroesForm.get('name')?.value) > -1)
    ))
    this._service.heroes$.subscribe((items: Hero[]) => {
      this.heroes = filteredHeroes;
    })
    // if (this.filterHeroesForm.get('sortLevel')?.value) {
    //   return this.heroes.sort((a, b) => a.level - b.level);
    // } else {
    //   return this.heroes.sort((a, b) => b.level - a.level);
    // }
    // }

  }
}
