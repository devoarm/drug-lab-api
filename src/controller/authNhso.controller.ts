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
vp.auth_code,
v.hn,
v.cid,
CONCAT(pt.pname,pt.fname,' ',pt.lname) as fullname,
v.age_y,
v.pdx,
o.vstdate,	
t.pttype,
t.name pttype_name,
k.department,
s.name spclty,
v.income	
FROM ovst o
LEFT JOIN vn_stat v on v.vn=o.vn
LEFT JOIN visit_pttype vp on vp.vn=o.vn
LEFT JOIN patient pt on pt.hn=o.hn
LEFT JOIN kskdepartment k on k.depcode=o.main_dep
LEFT JOIN spclty s on s.spclty=o.spclty
LEFT JOIN pttype t on t.pttype=vp.pttype
WHERE 
o.vstdate BETWEEN '${data.vstdateStart}' and '${data.vstdateEnd}'
AND pt.nationality = '99'
AND v.pttype NOT IN('10','12','30','01','40')
${data.ward.spclty != "" ? `AND s.spclty = '${data.ward.spclty}'` : ""}
${
  data.timeStart != "00:00:00" && data.timeEnd != "00:00:00"
    ? `AND o.vsttime BETWEEN "${data.timeStart}" AND "${data.timeEnd}"`
    : ``
} 
ORDER BY o.vstdate,vp.Auth_Code;`;

  try {
    const query = await dbHos.raw(sql);
    return res.json({ status: 200, results: query[0], msg: sql });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message, msg: sql });
  }
};
