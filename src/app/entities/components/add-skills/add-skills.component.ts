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

  public addSkillForm: FormGroup = new FormGroup( {
    [HeroesDetailEnum.SKILL]: new FormControl('', Validators.required)
});
  ngOnInit(): void {
    // this.addSkillForm.valueChanges.subscribe((value) => console.log(value));
  }


  public addSkill(): void {
    // this._service.skills$.subscribe((items: IdName[]) => {
    //   this.skills = items;
    // })
    if (this.addSkillForm.valid) {
      this._service.addSkill({id: this.skills.length + 1, name: this.addSkillForm.get('skill')?.value});
    } else {
      alert('Заполните поле добавления способности!')
    }
  }
}
