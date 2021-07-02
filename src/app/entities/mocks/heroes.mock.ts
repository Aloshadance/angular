import {Hero} from "../interfaces/hero";

export const Heroes: Hero[] = [
  {
    name: 'Лучник',
    power: 1,
    skill: [{
      id: 1,
      name: 'Меткий'
    }],
    level: 10,
    id: 1
  },
  {
    name: 'Рыцарь',
    power: 1,
    skill: [{
      id: 2,
      name: 'Выносливый'
    }],
    level: 5,
    id: 2
  },
  {
    name: 'Маг',
    power: 1,
    skill: [{
      id: 3,
      name: 'Умный'
    }],
    level: 15,
    id: 3
  }
  ];
