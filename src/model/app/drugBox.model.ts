import { Knex } from "knex";

declare module "knex/types/tables" {
  interface DrugBox {
    drug_box_id: number;
    drug_box_name: string;
    drug_box_status: string;
    current_send_person: string;
    current_receive_person: string;
    current_prepare_person: string;
    current_ward: string;
    date_time: string;
  }

  interface Tables {
    drug_box: DrugBox;
  }
}
export interface DrugBoxType {
  drug_box_id: number;
  drug_box_name: string;
  drug_box_status: string;
  current_send_person: string;
  current_receive_person: string;
  current_prepare_person: string;
  current_ward: string;
  date_time: string;
}
