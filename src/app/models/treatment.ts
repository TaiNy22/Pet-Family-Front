import {Pet} from "./pet";

export interface Treatment {
  createdDate?: Date;
  date: Date;
  description: string;
  id: number;
  pet: Pet;
  title: string;
}
