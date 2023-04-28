export interface User {
  id?: string;
  email: string;
  name: string;
  lastname: string;
  phone: number;
  password: string;
  username: string;
  roles: RoleUser[];
  createdDate?: Date;
}

export enum RoleUser {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER'
}