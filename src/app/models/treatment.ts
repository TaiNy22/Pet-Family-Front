import {Pet} from "./pet";

export interface Treatment {
  createdDate?: Date;
  date: Date;
  description: string;
  id: number;
  nextDate: Date;
  pet: Pet;
  reminder?: string;
  title: string;
}
