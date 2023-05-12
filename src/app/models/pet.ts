import {PetTypeEnum} from "./pet-type.enum";

export interface Pet {
  age: number;
  avatar: string;
  createdDate: Date;
  id: number;
  gender: string;
  name: string;
  sterilization: boolean;
  type: PetTypeEnum;
  weight: string;
}
