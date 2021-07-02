import {Component, OnInit} from '@angular/core';
import {Hero} from '../../interfaces/hero';
import {HeroesService} from "../../services/heroes.service";
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import {Validators} from "@angular/forms";
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

  public myForm: FormGroup = new FormGroup({
    [HeroesDetailEnum.NAME]: new FormControl("Герой", Validators.required),
    [HeroesDetailEnum.POWER]: new FormControl(1, Validators.required),
    [HeroesDetailEnum.SKILL]: new FormControl([], Validators.required),
    [HeroesDetailEnum.LEVEL]: new FormControl(1, Validators.required)
  });

  ngOnInit(): void {
    this.getSkills();
    this.myForm.valueChanges.subscribe((value) => console.log(value));
  }

  public getSkills(): void {
    this._service.getSkills();
    this._service.skills$.subscribe((items: IdName[]) => {
      this.skills = items;
    })
  }

  public addHero(): void {
    if (this.myForm.valid) {
      this._service.addHero(this.myForm.value);
    } else {
      alert('Заполните все поля создания героя!')
    }
  }
}
