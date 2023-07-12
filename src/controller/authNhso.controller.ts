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
  try {
    const query = await dbHos.raw(`SELECT 
		p.cid,
		p.pname,
		p.fname,
		p.lname,
    o.vn,
    o.hn,		
    o.vstdate,
    o.vsttime,
    o.hospmain,
    ptt.name AS pttype,
    o.main_dep,
		k.department
  FROM ovst o 
	LEFT JOIN patient p ON p.hn = o.hn
	LEFT JOIN pttype ptt ON ptt.pttype = o.pttype
	LEFT JOIN kskdepartment k ON k.depcode = o.main_dep
	WHERE o.vstdate = '${data.vstdate}'
  AND p.nationality = '99'
  AND o.pttype NOT IN('10','12','30','01','40')
  ${data.ward.depcode != "" ? `AND k.depcode = '${data.ward.depcode}'` : ''}
	GROUP BY p.hn
  ORDER BY vsttime`);

    return res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
