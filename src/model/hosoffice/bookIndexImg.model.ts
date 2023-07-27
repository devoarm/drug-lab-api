import { Knex } from "knex";

declare module "knex/types/tables" {
  interface bookIndexImg {
    ID: number;
    BOOK_ID: number | string;
    IMG_FILE: any;
    FILE_TYPE: string;
    FILE_SIZE: number;
    FILE_SIZE_MB: number;
  }

  interface Tables {
    book_index_img: bookIndexImg;
  }
}
export interface bookIndexImgType {
  ID: number;
  BOOK_ID: number | string;
  IMG_FILE: any;
  FILE_TYPE: string;
  FILE_SIZE: number;
  FILE_SIZE_MB: number;
}
