import express, { Request, Response } from "express";
import nurseIndicatTitles from "../../model/app/nurseIndicatTitle.model";
import nurseIndicatSubTitles from "../../model/app/nurseIndicatSubTitle.model";
import onDutys from "../../model/app/onDuty.model";
export const GetIndicatTitle = async (req: Request, res: Response) => {
  try {
    const q = await nurseIndicatTitles.find();
    return res.json({ status: 200, results: q });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const AddIndicatTitle = async (req: Request, res: Response) => {
  try {
    const q = await nurseIndicatTitles.create({ ...req.body });
    return res.json({ status: 200, results: q });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const GetIndicatSubTitle = async (req: Request, res: Response) => {
  try {
    const q = await nurseIndicatSubTitles.find();
    return res.json({ status: 200, results: q });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const AddIndicatSubTitle = async (req: Request, res: Response) => {
  try {
    const q = await nurseIndicatSubTitles.create({ ...req.body });
    return res.json({ status: 200, results: q });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const GetOndury = async (req: Request, res: Response) => {
  try {
    const q = await onDutys.find();
    return res.json({ status: 200, results: q });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
