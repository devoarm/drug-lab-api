import { Knex } from "knex";

declare module "knex/types/tables" {
  interface bookIndexSendLeader {
    ID: number;
    BOOK_ID: number;
    SEND_LD_HR_ID: number;
    SEND_LD_HR_NAME: string;
    SEND_LD_BY_HR_ID: number;
    SEND_LD_BY_HR_NAME: string;
    SEND_LD_DETAIL: string;
    SEND_LD_DATE: string;
    SEND_LD_DATE_TIME: string;
    SEND_STATUS: string;
    TOP_LEADER_AC_ID: number;
    TOP_LEADER_AC_NAME: string;
    TOP_LEADER_AC_DATE: string;
    TOP_LEADER_AC_CMD: string;
    TOP_LEADER_AC_DATE_TIME: string;
    TOP_LEADER_ORDER_FILE: any;
    CHK01: any;
    CHK02: any;
    CHK03: any;
    CHK04: any;
  }

  interface Tables {
    book_index_send_leader: bookIndexSendLeader;
  }
}
export interface bookIndexSendLeaderType {
  ID: number;
  BOOK_ID: number;
  SEND_LD_HR_ID: number;
  SEND_LD_HR_NAME: string;
  SEND_LD_BY_HR_ID: number;
  SEND_LD_BY_HR_NAME: string;
  SEND_LD_DETAIL: string;
  SEND_LD_DATE: string;
  SEND_LD_DATE_TIME: string;
  SEND_STATUS: string;
  TOP_LEADER_AC_ID: number;
  TOP_LEADER_AC_NAME: string;
  TOP_LEADER_AC_DATE: string;
  TOP_LEADER_AC_CMD: string;
  TOP_LEADER_AC_DATE_TIME: string;
  TOP_LEADER_ORDER_FILE: any;
  CHK01: any;
  CHK02: any;
  CHK03: any;
  CHK04: any;
}
