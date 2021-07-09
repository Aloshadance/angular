import {Component, OnInit} from '@angular/core';
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

  constructor(private _service: HeroesService) {}
  public HERO_ENUM: typeof HeroesDetailEnum = HeroesDetailEnum;

  public filterHeroesForm: FormGroup = new FormGroup({
    [HeroesDetailEnum.NAME]: new FormControl(''),
    [HeroesDetailEnum.SKILL]: new FormControl([]),
    [HeroesDetailEnum.FROM_LEVEL]: new FormControl(1),
    [HeroesDetailEnum.TO_LEVEL]: new FormControl(100),
    [HeroesDetailEnum.SORT_LEVEL]: new FormControl()
  })

  ngOnInit(): void {
    this.getSkills();
    this.filterHeroes();
  }

  public getSkills(): void {
    this._service.skills$.subscribe((items: IdName[]) => {
      this.skills = items;
    });
  }

  public filterHeroes(): void {
    this.filterHeroesForm.valueChanges.subscribe(value => {
      this._service.setFilterValue(value);
      this._service.filterHeroes();
    });
  }

}
