import { Knex } from "knex";

declare module "knex/types/tables" {
  interface RolesContent {
    id: number | string;
    content_id: number;
    menu_id: number;
  }

  interface Tables {
    role_content: RolesContent;
  }
}
export interface RolesContentType {
  id: number | string;
  content_id: number;
  menu_id: number;
}
