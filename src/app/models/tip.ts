import {PetTypeEnum} from "./pet-type.enum";

export interface Tip {
  createdDate?: Date;
  content: string;
  image: string;
  id?: number;
  title: string;
  type: PetTypeEnum;
}
