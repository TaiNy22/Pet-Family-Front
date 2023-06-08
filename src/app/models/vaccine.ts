import {Pet} from "./pet";

export interface Vaccine {
  createdDate?: Date;
  date: Date;
  done: boolean;
  id: number;
  pet: Pet;
  type: string;
}
