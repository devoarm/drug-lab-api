import express, { Request, Response } from "express";
import moment from "moment";
import dbOffice from "../config/dbOffice";
import fs from "fs";

import Leader from "../model/app/leaders.model";
import dbHos from "../config/dbHos";
import dotenv from "dotenv";
dotenv.config();
export const mapDepart = async (req: Request, res: Response) => {
  try {
    const hr_department = await dbOffice("hr_department");
    const hr_department_sub = await dbOffice("hr_department_sub");
    const hr_department_sub_sub = await dbOffice("hr_department_sub_sub");

    const mapDe = hr_department.map((item: any) => {
      return {
        HR_DEPARTMENT_ID: item.HR_DEPARTMENT_ID,
        name: item.HR_DEPARTMENT_NAME,
        book_num: item.BOOK_NUM,
        department_sub: hr_department_sub
          .filter((item_sub: any) => {
            return item_sub.HR_DEPARTMENT_ID == item.HR_DEPARTMENT_ID;
          })
          .map((item_sub_map) => {
            return {
              hr_department_sub_name: item_sub_map.HR_DEPARTMENT_SUB_NAME,
              isActive: item_sub_map.ACTIVE,
              book_num: item_sub_map.BOOK_NUM,
              book_hr_id: item_sub_map.BOOK_HR_ID,
              leader_hr_id: item_sub_map.LEADER_HR_ID,
              phone_in: item_sub_map.PHONE_IN,
              line_token_set: item_sub_map.LINE_TOKEN_SET,
            };
          }),
        isActive: item.ACTIVE,
        leader_hr_id: item.LEADER_HR_ID,
        phone_id: item.PHONE_IN,
        line_token: item.LINE_TOKEN_SET,
        hr_depart_id: item.HR_DEPART_ID,
        createAt: moment().format("YYYY-MM-DD HH:MM:ss"),
        updateAt: moment().format("YYYY-MM-DD HH:MM:ss"),
      };
    });
    const jsonData = JSON.stringify(mapDe, null, 2);
    fs.writeFile("data.json", jsonData, "utf8", (err: any) => {
      if (err) {
        console.error("Error writing JSON file:", err);
        return;
      }
      console.log("JSON file has been saved.");
    });
    return res.json({
      status: 200,
      results: mapDe,
    });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const getGroup = async (req: Request, res: Response) => {
  try {
    const query = await dbOffice.raw(`SELECT
    hr_department.*
  FROM
    hr_department
  WHERE ACTIVE = "TRUE"`);

    return res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const getDepart = async (req: Request, res: Response) => {
  try {
    const query = await dbOffice.raw(`SELECT
    hr_department_sub.*
  FROM
    hr_department_sub
  WHERE ACTIVE = "TRUE"`);

    return res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const getPerson = async (req: Request, res: Response) => {
  try {
    const query =
      await dbOffice.raw(`SELECT CONCAT(pf.HR_PREFIX_NAME,hp.HR_FNAME," ",hp.HR_LNAME) AS fullname,hp.ID as id FROM hr_person hp
  LEFT JOIN hr_prefix pf ON hp.HR_PREFIX_ID = pf.HR_PREFIX_ID`);

    return res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const getLeader = async (req: Request, res: Response) => {
  try {
    const leaderId = process.env.LEADER_ID;
    const leaderName = process.env.LEADER_NAME;
    return res.json({
      status: 200,
      results: { id: leaderId, name: leaderName },
    });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const HosWard = async (req: Request, res: Response) => {
  try {
    const query = await dbHos.raw(
      `SELECT k.depcode,k.department FROM kskdepartment k`
    );
    return res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const HosDoctor = async (req: Request, res: Response) => {
  try {
    const query = await dbHos.raw(`SELECT 
    d.code,
    d.name 
  FROM doctor d 
  WHERE
    d.active = 'Y'
    AND d.position_id = '1'`);
    return res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
