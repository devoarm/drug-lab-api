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
export const DelFormulas = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const query = await drugCalmedVeinFormulas.deleteOne({ _id: _id });
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const UpdateFormulas = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    console.log({ ...req.body });
    const query = await drugCalmedVeinFormulas.updateOne(
      { _id: _id },
      { ...req.body }
    );

    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
