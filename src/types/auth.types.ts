export interface IUser {
  id: string;
  email: string;
  name: string;
}

export interface ILoginDto {
  email: string;
  password: string;
}
