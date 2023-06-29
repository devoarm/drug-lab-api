import express, { Request, Response } from "express";
import dbApp from "../../config/dbApp";
import moment from "moment";
import dbHos from "../../config/dbHos";
import dbOffice from "../../config/dbOffice";
import drugBoxItems from "../../model/app/drugBoxItems.model";
import DrugBoxs from "../../model/app/drugBox.model";
import DrugBoxWards from "../../model/app/drugBoxWard.model";
import DrugBoxSpecified from "../../model/app/drugBoxSpecified.model";
import dbAppMong from "../../config/dbAppMong";
import Patients from "../../model/app/patients.model";
import { ReqFollowType } from "../../types/drug/drug-backlog/ReqFollow.type";
const saltRounds = 10;

require("dotenv").config();

const secret = process.env.SECRET_KEY;

export const SearchVn = async (req: Request, res: Response) => {
  const { vn } = req.params;
  try {
    const query: any = await dbHos.raw(`SELECT
    di.name AS drug_name,
    di.units,
    di.strength,
    di.unitprice,
    o.hos_guid as id,   
    o.icode,
    o.qty,
    o.drugusage,
    o.vstdate,
    o.vsttime,
    o.rxtime,
    o.hcode,
    o.dep_code,
    o.pttype,
    o.staff,
    o.item_no,
    o.sum_price,
    o.cost
  FROM opitemrece o 
  INNER JOIN drugitems di ON o.icode = di.icode
  WHERE 
    o.vn = "${vn}" 	`);
    return res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const SearchPatient = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const query: any = await dbHos.raw(`SELECT 
    *
FROM patient p
WHERE p.cid = "${slug}" OR p.hn = "${slug}" OR CONCAT(p.fname," ",p.lname) LIKE "%${slug}%" LIMIT 20`);
    return res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const SearchPatientByVn = async (req: Request, res: Response) => {
  const { vn } = req.params;
  try {
    const query: any = await dbHos.raw(`SELECT 
    CONCAT(p.pname,p.fname," ",p.lname) AS fullname,
    o.hos_guid,
    o.vn,
    o.hn,
    o.vstdate,
    ptt.name AS pttype,
    o.pttypeno AS cid,
    k.department
  FROM ovst o
  LEFT JOIN patient p ON p.hn = o.hn
  LEFT JOIN kskdepartment k ON o.main_dep = k.depcode
  LEFT JOIN pttype ptt ON p.pttype = ptt.pttype
  WHERE o.vn = '${vn}'`);
    return res.json({ status: 200, results: query[0][0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const FollowVisit = async (req: Request, res: Response) => {
  const data: ReqFollowType = req.body.data;
  try {
    const findHn = await Patients.findOne({ hn: data.hn });
    if (!findHn) {
      const followHn = await Patients.create(data);
      return res.json({ status: 200, results: followHn });
    } else {
      const checkVisit = await Patients.findOne(
        { _id: findHn._id },
        { visit: { $elemMatch: { vn: data.visit[0].vn } } }
      );
      if (checkVisit?.visit.length == 0) {
        const pushItem = await Patients.updateOne(
          { _id: findHn._id },
          {
            $push: {
              visit: {
                $each: data.visit,
              },
            },
          }
        );
        return res.json({ status: 200, results: pushItem });
      } else {
        return res.json({ status: 301, results: [], msg: "followed" });
      }
    }
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const findVn = async (req: Request, res: Response) => {
  const { vn } = req.params;
  try {
    const findVn = await Patients.findOne({ "visit.vn": vn });
    if (findVn) {
      return res.json({ status: 200, results: findVn });
    } else {
      return res.json({ status: 301, results: findVn });
    }
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const GetVnByHn = async (req: Request, res: Response) => {
  const { hn } = req.params;
  try {
    const query: any =
      await dbHos.raw(`SELECT o.vn, o.vstdate FROM ovst o WHERE o.hn = "${hn}"
    ORDER BY o.vstdate DESC`);
    return res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
