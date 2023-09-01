import express, { Request, Response } from "express";
import DrugUnits from "../../model/app/drugUnits.model";
import drugCalmedVeinFormulas from "../../model/app/drugCalmedVeinFormulas";

export const GetUnitType = async (req: Request, res: Response) => {
  try {
    const query = await DrugUnits.find();
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const GetFormula = async (req: Request, res: Response) => {
  try {
    const query = await drugCalmedVeinFormulas.find();
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const AddFormulas = async (req: Request, res: Response) => {
  try {
    const query = await drugCalmedVeinFormulas.create(req.body);
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
