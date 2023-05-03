import { Knex } from "knex";

declare module "knex/types/tables" {
  interface Sex {
    id: number;
    sex: string;
  }

  interface Tables {
    sex: Sex;
  }
}
export interface SexType {
  id: number;
  sex: string;
}
