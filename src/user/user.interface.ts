export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  gender: string;
  createdAt: Date;
  updatedAt?: Date;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
