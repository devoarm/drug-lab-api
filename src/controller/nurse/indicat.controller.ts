import express, { Request, Response } from "express";
import nurseIndicatTitles from "../../model/app/nurseIndicatTitle.model";
import nurseIndicatSubTitles from "../../model/app/nurseIndicatSubTitle.model";
import onDutys from "../../model/app/onDuty.model";
import nurseIndicat from "../../model/app/nurseIndicat.model";
export const GetIndicatTitle = async (req: Request, res: Response) => {
  try {
    const q = await nurseIndicatTitles.find({ isActive: true });
    return res.json({ status: 200, results: q });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const UpdateIndicatTitle = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const q = await nurseIndicatTitles.findOneAndUpdate(
      { _id: _id },
      { title: req.body.title }
    );
    return res.json({ status: 200, results: q });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const DelIndicatTitle = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const q = await nurseIndicatTitles.findOneAndUpdate(
      { _id: _id },
      { isActive: false }
    );
    return res.json({ status: 200, results: q });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const GetIndicat = async (req: Request, res: Response) => {
  try {
    const q = await nurseIndicat.aggregate([
      {
        $lookup: {
          from: "nurse_indicat_titles", // Name of the collection to join
          localField: "titleId", // Field from the local collection
          foreignField: "_id", // Field from the 'from' collection to match
          as: "title", // Output array field containing joined documents
        },
      },
      {
        $lookup: {
          from: "nurse_indicat_sub_titles", // Name of the collection to join
          localField: "subTitleId", // Field from the local collection
          foreignField: "_id", // Field from the 'from' collection to match
          as: "subTitle", // Output array field containing joined documents
        },
      },
      {
        $lookup: {
          from: "on_dutys", // Name of the collection to join
          localField: "onDutyId", // Field from the local collection
          foreignField: "_id", // Field from the 'from' collection to match
          as: "onDuty", // Output array field containing joined documents
        },
      },
    ]);
    return res.json({ status: 200, results: q });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const AddIndicat = async (req: Request, res: Response) => {
  try {
    const q = await nurseIndicat.create({ ...req.body });
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
    const q = await nurseIndicatSubTitles.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
      {
        $lookup: {
          from: "nurse_indicat_titles", // Name of the collection to join
          localField: "titleId", // Field from the local collection
          foreignField: "_id", // Field from the 'from' collection to match
          as: "title", // Output array field containing joined documents
        },
      },
    ]);
    return res.json({ status: 200, results: q });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const UpdateIndicatSubTitle = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const q = await nurseIndicatSubTitles.findOneAndUpdate(
      { _id: _id },
      { titleId: req.body.titleId, subTitle: req.body.subTitle }
    );
    return res.json({ status: 200, results: q });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const DetIndicatSubTitle = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const q = await nurseIndicatSubTitles.findOneAndUpdate(
      { _id: _id },
      { isActive: false }
    );
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
