export enum Role {
  Member = 'Member',
  Admin = 'Admin',
}

export class UserDto {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: Role;
}
