import { Knex } from "knex";

declare module "knex/types/tables" {
  interface SysPermis {
    PERMIS_ID: string;
    PERMIS_NAME: string;
  }

  interface Tables {
    sys_permis: SysPermis;
  }
}
export interface SysPermisType {
  PERMIS_ID: string;
  PERMIS_NAME: string;
}
