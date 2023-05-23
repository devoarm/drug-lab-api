import { Knex } from "knex";

declare module "knex/types/tables" {
  interface bookIndex {
    ID: number;
    BOOK_NUM_IN: number;
    BOOK_NUMBER: string;
    BOOK_DATE: string;
    BOOK_URGENT_ID: string;
    BOOK_TYPE_ID: string;
    BOOK_NAME: string;
    BOOK_DETAIL: string;
    BOOK_ORG_ID: number;
    BOOK_ORG_TO_ID: number;
    PERSON_SAVE_ID: string;
    DATE_TIME_SAVE: string;
    BOOK_YEAR_ID: string;
    BOOK_SECRET_ID: number;
    IMAGE: any;
    BOOK_DATE_EXPIRE: string;
    DATE_SAVE: string;
    BOOK_HAVE_FILE: string;
    BOOK_FILE_SIZE: string;
    BOOK_READ: string;
    SEND_LD_HR_ID: number;
    SEND_LD_HR_NAME: string;
    SEND_LD_BY_HR_ID: number;
    SEND_LD_BY_HR_NAME: string;
    SEND_LD_DETAIL: string;
    SEND_LD_DATE: string;
    SEND_LD_DATE_TIME: string;
    SEND_STATUS: string;
    TIME_SAVE: string;
    BOOK_ORG_FROM_NAME: string;
    BOOK_ORG_TO_NAME: string;
    COMMENT: any;
    DEV_TYPE_ID: any;
    EMAIL: any;
    KEEP_ID: any;
    LOCATION_ID: any;
    PROVICE_ID: any;
    PROVICE_NAME: string;
    RECORD_DATE_BEGIN: any;
    RECORD_DATE_END: any;
    TREAT_ID: any;
    BOOK_FAM_CODE: any;
    ISUTILITY: any;
    APP_TYPE_SAVE: any;
    DATE_TIME_UPDATE: any;
    FILE_01: any;
    UPDATE_BY: any;
  }

  interface Tables {
    book_index: bookIndex;
  }
}
export interface bookIndexType {
  ID: number;
  BOOK_NUM_IN: number;
  BOOK_NUMBER: string;
  BOOK_DATE: string;
  BOOK_URGENT_ID: string;
  BOOK_TYPE_ID: string;
  BOOK_NAME: string;
  BOOK_DETAIL: string;
  BOOK_ORG_ID: number;
  BOOK_ORG_TO_ID: number;
  PERSON_SAVE_ID: string;
  DATE_TIME_SAVE: string;
  BOOK_YEAR_ID: string;
  BOOK_SECRET_ID: number;
  IMAGE: any;
  BOOK_DATE_EXPIRE: string;
  DATE_SAVE: string;
  BOOK_HAVE_FILE: string;
  BOOK_FILE_SIZE: string;
  BOOK_READ: string;
  SEND_LD_HR_ID: any;
  SEND_LD_HR_NAME: any;
  SEND_LD_BY_HR_ID: any;
  SEND_LD_BY_HR_NAME: any;
  SEND_LD_DETAIL: any;
  SEND_LD_DATE: any;
  SEND_LD_DATE_TIME: any;
  SEND_STATUS: any;
  TIME_SAVE: string;
  BOOK_ORG_FROM_NAME: string;
  BOOK_ORG_TO_NAME: string;
  COMMENT: any;
  DEV_TYPE_ID: any;
  EMAIL: any;
  KEEP_ID: any;
  LOCATION_ID: any;
  PROVICE_ID: any;
  PROVICE_NAME: string;
  RECORD_DATE_BEGIN: any;
  RECORD_DATE_END: any;
  TREAT_ID: any;
  BOOK_FAM_CODE: any;
  ISUTILITY: any;
  APP_TYPE_SAVE: any;
  DATE_TIME_UPDATE: any;
  FILE_01: any;
  UPDATE_BY: any;
}
