import { Component, OnInit } from '@angular/core';
import {IdName} from "../../interfaces/id-name.interface";
import {HeroesService} from "../../services/heroes.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HeroesDetailEnum } from '../../enums/heroes-detail.enum';


@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.scss']
})
export class AddSkillsComponent implements OnInit {
  public skills: IdName[] = [];

  constructor(private _service: HeroesService) { }

  public HERO_ENUM: typeof HeroesDetailEnum = HeroesDetailEnum;
  public addSkillForm: FormGroup = new FormGroup( {
    [HeroesDetailEnum.NAME]: new FormControl('', Validators.required)
});
  ngOnInit(): void {
    this.getSkills();
  }

  public getSkills(): void {
    this._service.skills$.subscribe((items: IdName[]) => {
      this.skills = items;
    });
  }

  public addSkill(): void {
    if ((this.addSkillForm.valid) && (!this.skills.find(item => item.name === this.addSkillForm.get('skill')?.value))) {
      this._service.addSkill(this.addSkillForm.value);
    } else {
      alert('Заполните поле добавления способности иначе!')
    }
  }
}
