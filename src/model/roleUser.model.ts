import { Knex } from "knex";

declare module "knex/types/tables" {
  interface RolesUser {
    id: number | string;
    user_id: number;
    menu_id: number;
  }

  interface Tables {
    role_user: RolesUser;
  }
}
export interface RolesUserType {
  id: number | string;
  user_id: number;
  menu_id: number;
}
