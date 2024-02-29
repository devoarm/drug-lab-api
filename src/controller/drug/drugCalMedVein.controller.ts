import express, { Request, Response } from "express";
import DrugUnits from "../../model/app/drugUnits.model";
import drugCalmedVeinFormulas from "../../model/app/drugCalmedVeinFormulas.model";

export const GetUnitType = async (req: Request, res: Response) => {
  try {
    const query = await DrugUnits.find();
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};


