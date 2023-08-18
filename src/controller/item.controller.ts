import express, { Request, Response } from "express";
import moment from "moment";
import dbOffice from "../config/dbOffice";
import fs from "fs";

import Leader from "../model/app/leaders.model";
import dbHos from "../config/dbHos";
import dotenv from "dotenv";
dotenv.config();

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
