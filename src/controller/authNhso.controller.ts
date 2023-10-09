import express, { Request, Response } from "express";
import MessageResponse from "../interfaces/MessageResponse";
import jwt_decode from "jwt-decode";
import dbApp from "../config/dbApp";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { reqRegister } from "../interfaces/auth.type";
import moment from "moment";
import Authens from "../model/app/authens.model";
import dbHos from "../config/dbHos";
const secret: any = process.env.SECRET_KEY;
const saltRounds = 10;

export const getRegisterNhso = async (req: Request, res: Response) => {
  const { pid } = req.params;
  try {
    const query = await Authens.find({ pid: pid });
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const registerNhso = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const query = await Authens.create(data);
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const checkAuthByDate = async (req: Request, res: Response) => {
  const data = req.body;

  const sql = `SELECT
  v.vn,
  v.hn,
  p.cid,
  CONCAT(p.fname,' ',p.lname) as fullname,
  v.pttype,
  pt.name,
  v.spclty,
  spclty.name as spc_name,
  a.CLAIM_CODE as authen_aauth,
  aa.AuthenCode as authen_nhso,
  aa.ServiceDate as service_date
  FROM vn_stat v
  LEFT JOIN patient p ON v.hn = p.hn
  LEFT JOIN pttype pt ON v.pttype = pt.pttype
  LEFT JOIN spclty ON v.spclty = spclty.spclty
  LEFT JOIN authenhos a ON a.CREATED_DATE = v.vstdate AND p.cid = a.PID
  LEFT JOIN (SELECT
  HCode,
  VN,
  CID,
  HN,Service,
  ServiceCode,
  ServiceDate,
  CAST(AuthenDate AS DATE) AS AuthenDate,
  AuthenCode
  FROM rcmdb.authencode 
  WHERE CAST(AuthenDate AS DATE) = CURDATE()) AS AA ON AA.AuthenDate = v.vstdate AND p.cid = AA.CID
  
  WHERE       
    v.vstdate BETWEEN '${data.vstdate}' AND '${data.vstdate}'
     ${
       data.timeStart == "00:00:00" && data.timeEnd == "00:00:00"
         ? ``
         : `AND TIME(aa.ServiceDate) BETWEEN '${data.timeStart}' AND '${data.timeEnd}'`
     } 
    ${data.ward.spclty != "" ? ` AND v.spclty = ${data.ward.spclty}` : ""}
    AND p.nationality = '99'`;
  try {
    const query = await dbHos.raw(sql);

    return res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message, msg: sql });
  }
};
