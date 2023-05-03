import express, { Request, Response } from "express";

import jwt_decode from "jwt-decode";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import moment from "moment";
import dbOffice from "../../config/dbOffice";
import { LEADER_ID } from "../../config/globalValue";
const secret: any = process.env.SECRET_KEY;
const saltRounds = 10;

export const getBookCheck = async (req: Request, res: Response) => {
  try {
    const query = await dbOffice("book_index_send_leader as bl")
      .leftJoin("book_index as b", "bl.BOOK_ID", "b.ID")
      .leftJoin("book_index_img as bi", "bi.BOOK_ID", "b.ID")
      .leftJoin("book_urgent as bu", "b.BOOK_URGENT_ID", "bu.URGENT_ID")
      .where("bl.SEND_STATUS", "SEND")
      .where("bl.SEND_LD_HR_ID", LEADER_ID)
      .orderBy([
        // { column: "bl.TOP_LEADER_AC_DATE_TIME", order: "desc" },
        { column: "bl.SEND_LD_DATE_TIME", order: "desc" },
      ])
      .select(
        "b.ID as BOOK_ID",
        "b.BOOK_NAME",
        "b.BOOK_NUMBER",
        "b.BOOK_DETAIL",
        "b.BOOK_URGENT_ID",
        "bu.URGENT_NAME",
        "bl.*",
        "bi.ID as BOOK_IMAGE_ID",
        "bi.FILE_TYPE"
      );
    return res.json({
      status: 200,
      results: query,
    });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const getBookById = async (req: Request, res: Response) => {
  const { idBook } = req.params;
  try {
    const query = await dbOffice("book_index_send_leader as bl")
      .leftJoin("book_index as b", "bl.BOOK_ID", "b.ID")
      .leftJoin("book_index_img as bi", "bi.BOOK_ID", "b.ID")
      .leftJoin("book_urgent as bu", "b.BOOK_URGENT_ID", "bu.URGENT_ID")
      .where("b.ID", idBook)
      .orderBy([
        // { column: "bl.TOP_LEADER_AC_DATE_TIME", order: "desc" },
        { column: "bl.SEND_LD_DATE_TIME", order: "desc" },
      ])
      .select(
        "b.ID as BOOK_ID",
        "b.BOOK_NAME",
        "b.BOOK_NUMBER",
        "b.BOOK_DETAIL",
        "b.BOOK_URGENT_ID",
        "bu.URGENT_NAME",
        "bl.*",
        "bi.ID as BOOK_IMAGE_ID",
        "bi.FILE_TYPE"
      ).first()
    return res.json({
      status: 200,
      results: query,
    });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const secretaryAccept = async (req: Request, res: Response) => {
  const { idBook } = req.params;
  try {
    const query = await dbOffice("book_index_send_leader").where('BOOK_ID',idBook).update({SEND_STATUS:'CHECK'})
    return res.json({
      status: 200,
      results: query,
    });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const secretaryReject = async (req: Request, res: Response) => {
  const { idBook } = req.params;
  try {
    const query = await dbOffice("book_index_send_leader").where('BOOK_ID',idBook).update({SEND_STATUS:'REJECT'})
    return res.json({
      status: 200,
      results: query,
    });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
