import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroesService } from "../../services/heroes.service";
import {IdName} from "../../interfaces/id-name.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HeroesDetailEnum} from "../../enums/heroes-detail.enum";

@Component({
  selector: 'app-edit-heroes',
  templateUrl: './edit-heroes.component.html',
  styleUrls: ['./edit-heroes.component.scss']
})
export class EditHeroesComponent implements OnInit {
  public hero: Hero = {name: '', power: 0, skill: [], level: 0, id: 0};
  public skills: IdName[] = [];

  constructor(private _service: HeroesService) {}
  public HERO_ENUM: typeof HeroesDetailEnum = HeroesDetailEnum;
  public editHeroForm: FormGroup = new FormGroup( {
    [HeroesDetailEnum.NAME]: new FormControl(),
    [HeroesDetailEnum.POWER]: new FormControl(),
    [HeroesDetailEnum.SKILL]: new FormControl([]),
    [HeroesDetailEnum.LEVEL]: new FormControl()
  });

  ngOnInit(): void {
    this.getSkills();
    this.getHero();
  }

  public getSkills(): void {
    this._service.skills$.subscribe((items: IdName[]) => {
      this.skills = items;
    })
  }

  public getHero(): void {
    this._service.selectedHero$.subscribe((item: Hero) => {
      this.hero = item;
      this.editHeroForm.patchValue(this.hero);
    });
  }

  public updateHero(): void {
    this.hero = this.editHeroForm.value;
    this._service.foundHeroId$.subscribe((item: number) => {
      this.hero.id = item;
    });
    this._service.updateHero(this.hero);
  }
}

