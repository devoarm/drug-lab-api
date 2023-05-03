import { Knex } from "knex";

declare module "knex/types/tables" {
  interface SysPermisList {
    ID: number;
    PERSON_ID: string;
    PERMIS_ID: string;
  }

  interface Tables {
    sys_permis_list: SysPermisList;
  }
}
export interface SysPermisListType {
  ID: number;
  PERSON_ID: string;
  PERMIS_ID: string;
}
