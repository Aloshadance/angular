import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterHeroesComponent } from './filter-heroes.component';

describe('FilterHeroesComponent', () => {
  let component: FilterHeroesComponent;
  let fixture: ComponentFixture<FilterHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterHeroesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
