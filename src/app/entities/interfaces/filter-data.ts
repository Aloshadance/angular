import {IdName} from "./id-name.interface";

export interface FilterData {
  name: string;
  fromLevel: number;
  toLevel: number;
  sortLevel: boolean;
  skill: IdName[];
}
