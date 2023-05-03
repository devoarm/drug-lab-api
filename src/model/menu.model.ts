import { Knex } from "knex";

declare module "knex/types/tables" {
  interface Menu {
    id: number | string;
    parent: number | string;
    text: string;
    title: string;
    index: number;
    icon?: string;
    action?: string;
    subject?: string;
    droppable?: boolean;
    externalLink?: boolean;
    path?: string;
    data?: any;
    isActive: string;
  }

  interface Tables {
    menu: Menu;
  }
}
export interface MenuType {
  id: number | string;
  parent: number | string;
  text: string;
  title: string;
  index: number;
  icon?: string;
  action?: string;
  subject?: string;
  droppable?: boolean;
  externalLink?: boolean;
  path?: string;
  data?: any;
  isActive: string;
}
