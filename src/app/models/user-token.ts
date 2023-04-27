import {RoleUser} from "./user";

export interface UserToken {
  id: number;
  lastname: string;
  name: string;
  roles: RoleUser[];
  token: string;
  type: string;
  username: string;
}
