import {Component, OnInit} from '@angular/core';
import {Hero} from '../../interfaces/hero';
import {HeroesService} from "../../services/heroes.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IdName} from "../../interfaces/id-name.interface";
import {HeroesDetailEnum} from "../../enums/heroes-detail.enum";

@Component({
  selector: 'app-add-heroes',
  templateUrl: './add-heroes.component.html',
  styleUrls: ['./add-heroes.component.scss']
})
export class AddHeroesComponent implements OnInit {
  public skills: IdName[] = [];
  public heroes: Hero[] = [];

  constructor(private _service: HeroesService) {}

  public HERO_ENUM: typeof HeroesDetailEnum = HeroesDetailEnum;
  public addHeroForm: FormGroup = new FormGroup({
    [HeroesDetailEnum.NAME]: new FormControl("Разведчик", Validators.required),
    [HeroesDetailEnum.POWER]: new FormControl(1, [Validators.required,Validators.min(1)]),
    [HeroesDetailEnum.SKILL]: new FormControl([], Validators.required),
    [HeroesDetailEnum.LEVEL]: new FormControl(1,[Validators.max(100), Validators.min(1),
      Validators.required])
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

  public addHero(): void {
    if (this.addHeroForm.valid) {
      this._service.addHero(this.addHeroForm.value);
    } else {
      alert('Заполните все поля создания героя!')
    }
  }
}
