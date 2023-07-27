import { Knex } from "knex";

declare module "knex/types/tables" {
  interface bookIndexSendCheck {
    ID: number;
    BOOK_ID: number;
    SEND_LD_HR_ID: number;
    SEND_LD_HR_NAME: string;
    SEND_BY_HR_ID: number;
    SEND_BY_HR_NAME: string;
    SEND_LD_DETAIL: string;
    SEND_LD_DATE: string;
    SEND_LD_DATE_TIME: string;
    SEND_STATUS: string;
    TOP_LEADER_AC_ID: any;
    TOP_LEADER_AC_NAME: any;
    TOP_LEADER_AC_DATE: any;
    TOP_LEADER_AC_CMD: any;
    TOP_LEADER_AC_DATE_TIME: any;
    TOP_LEADER_ORDER_FILE: any;
  }

  interface Tables {
    book_index_send_check: bookIndexSendCheck;
  }
}
export interface bookIndexSendCheckType {
  ID: number;
  BOOK_ID: number;
  SEND_LD_HR_ID: number;
  SEND_LD_HR_NAME: string;
  SEND_BY_HR_ID: number;
  SEND_BY_HR_NAME: string;
  SEND_LD_DETAIL: string;
  SEND_LD_DATE: string;
  SEND_LD_DATE_TIME: string;
  SEND_STATUS: string;
  TOP_LEADER_AC_ID: any;
  TOP_LEADER_AC_NAME: any;
  TOP_LEADER_AC_DATE: any;
  TOP_LEADER_AC_CMD: any;
  TOP_LEADER_AC_DATE_TIME: any;
  TOP_LEADER_ORDER_FILE: any;
}
