import { Knex } from "knex";

declare module "knex/types/tables" {
  interface User {
    id: number;
    username: string;
    password: string;
    p_name: string;
    f_name: string;
    l_name: string;
    role: string;
    email: string;
    avatar: string;
    sex: string;
    create_at: string;
    isAdmin:string
  }

  interface Tables {
    user: User;
  }
}
export interface UserType {
  id: number;
  username: string;
  password: string;
  p_name: string;
  f_name: string;
  l_name: string;
  role: string;
  email: string;
  avatar: string;
  sex: string;
  create_at: string;
  isAdmin:string
}
