import express, { Request, Response } from "express";
import MessageResponse from "../interfaces/MessageResponse";
import jwt_decode from "jwt-decode";
import dbApp from "../config/dbApp";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { reqRegister } from "../interfaces/auth.type";
import moment from "moment";
import dbOffice from "../config/dbOffice";
import axios from "axios";
const secret: any = process.env.SECRET_KEY;
const saltRounds = 10;

export const getRoleByIdPerson = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const query = await dbOffice("sys_permis_list").where("PERSON_ID", id);
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const UseRoleNotifyLine = async (req: Request, res: Response) => {
  const data = req.body;
  const lineNotifyUrl = "https://notify-api.line.me/api/notify";
  const message = `\nขอใช้งานระบบ : ${data.permisId}\n${data.fullname}`;
  try {
    const resData = await axios.post(
      lineNotifyUrl,
      { message: message },
      {
        headers: {
          Authorization: `Bearer KKKE8HpQFaE8Hu1c8ZLMSB0xULlZJZR5eIYGBQC3Pu6`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.json({ status: 200, results: resData.data });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
