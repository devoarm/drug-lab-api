import { Knex } from "knex";

declare module "knex/types/tables" {
  interface Contents {
    id: number | string;
    title: string;
    detail: string;
    html:string
    createDate: string;
    updateDate: string;
    createTime: string;
    updateTime: string;
  }

  interface Tables {
    contents: Contents;
  }
}
export interface ContentsType {
  id: number | string;
  title: string;
  detail: string;
  html:string
  createDate: string;
  updateDate: string;
  createTime: string;
  updateTime: string;
}
