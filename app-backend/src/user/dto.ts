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

export class changePasswordDto {
  userName: string;
  password: string;
  confirmPassword: string;
}

export class resetPasswordDto {
  userName: string;
  password: string;
}
