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
  public hero: Hero | undefined;
  public skills: IdName[] = [];

  constructor(private _service: HeroesService) {}

  public editHeroForm: FormGroup = new FormGroup( {
    [HeroesDetailEnum.NAME]: new FormControl('',Validators.required),
    [HeroesDetailEnum.POWER]: new FormControl(1, Validators.required),
    [HeroesDetailEnum.SKILL]: new FormControl([], Validators.required)
  });

  ngOnInit(): void {
    this.getSkills();
  }

  public getSkills(): void {
    this._service.getSkills();
    this._service.skills$.subscribe((items: IdName[]) => {
      this.skills = items;
    })
  }

  public updateHero(): void {
    // this._service.setSelectedHero();
    // this._service.selectedHero$.subscribe((item: Hero) => {
    //   console.log(item);
    //   this.hero = item;
    // })
  }
}

