import express, { Request, Response } from "express";
import dbApp from "../../config/dbApp";
import moment from "moment";
import dbHos from "../../config/dbHos";

import DrugBacklogs from "../../model/app/drugBacklogs.model";
import { DrugBackLogsAddType } from "../../types/drug/drug-backlog/ReqFollow.type";
import DrugVisits from "../../model/app/drugVisit.model";
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
    // const findQ = await DrugVisits.findOne(
    //   { vn: vn },
    //   { createdAt: 0, updatedAt: 0, __v: 0 }
    // );

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
  LEFT JOIN pttype ptt ON o.pttype = ptt.pttype
  WHERE o.vn = '${vn}'`);
    return res.json({ status: 200, results: query[0][0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const FollowVisit = async (req: Request, res: Response) => {
  const data: DrugBackLogsAddType = req.body.data;
  try {
    const findVn = await DrugVisits.findOne({ vn: data.vn });
    if (!findVn) {
      const addVisit = await DrugVisits.create({
        hn: data.hn,
        vn: data.vn,
        fullname: data.fullname,
        cid: data.cid,
        vstdate: data.vstdate,
        opitemrece: data.opitemrece,
      });
      return res.json({ status: 200, results: addVisit });
    } else {
      const query = await DrugVisits.updateOne(
        { vn: data.vn },
        { opitemrece: data.opitemrece }
      );
      return res.json({ status: 200, results: query });
    }
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const GetStalVn = async (req: Request, res: Response) => {
  
  try {
    const findVn = await DrugVisits.aggregate([
      // Get just the docs that contain a shapes element where color is 'red'
      // { $match: { "opitemrece.drug_name": "DEXTROMETHORPHAN" } },
      {
        $project: {
          opitemrece: {
            $filter: {
              input: "$opitemrece",
              as: "opitemrece",
              cond: { $gt: ["$$opitemrece.stale", 0] },
            },
          },
          vn: 1,
          hn: 1,
          fullname: 1,
          vstdate: 1,
        },
      },
    ]);
    if (findVn) {
      const filQ = findVn.filter((item: any) => item.opitemrece.length > 0);
      return res.json({ status: 200, results: filQ });      
    } else {
      return res.json({ status: 301, results: findVn });
    }
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const GetVnApp = async (req: Request, res: Response) => {
  const { vn } = req.params;
  try {
    const findQ = await DrugVisits.findOne({ vn: vn }, { opitemrece: 1 });
    if (!findQ) {
      return res.json({ status: 301, results: findQ });
    }
    return res.json({ status: 200, results: findQ.opitemrece });
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
export const GetStalByHn = async (req: Request, res: Response) => {
  const { hn } = req.params;
  try {
    const findVn = await DrugVisits.aggregate([
      // Get just the docs that contain a shapes element where color is 'red'
      { $match: { hn: hn } },
      {
        $project: {
          opitemrece: {
            $filter: {
              input: "$opitemrece",
              as: "opitemrece",
              cond: { $gt: ["$$opitemrece.stale", 0] },
            },
          },
          vn: 1,
          hn: 1,
          fullname: 1,
          vstdate: 1,
        },
      },
    ]);
    if (findVn) {
      const filQ = findVn.filter((item: any) => item.opitemrece.length > 0);
      return res.json({ status: 200, results: filQ });
    } else {
      return res.json({ status: 301, results: findVn });
    }
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
