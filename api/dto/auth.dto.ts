export interface LoginFormDTO {
  email: string;
  password: string;
}

export interface LoginResDTO {
  token: string;
}

export type RegFormDTO = LoginFormDTO & { fullname: string };

export type RegResDTO = LoginResDTO;

export interface User {
  id: number;
  email: string;
  fullname: string;
}
