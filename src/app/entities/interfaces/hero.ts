import {IdName} from "./id-name.interface";

export interface Hero extends IdName{
  power: number;
  skill: IdName[];
  level: number;
}
