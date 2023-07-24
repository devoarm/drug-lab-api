import express, { Request, Response } from "express";
import SetOrLineGroup from "../../model/app/setOrLineGroup.model";
import SetOr from "../../model/app/setOr.model";
import axios from "axios";

export const getSetOr = async (req: Request, res: Response) => {
  try {
    const q = await SetOr.find().sort({ date_time_surgery: -1 });
    return res.json({ status: 200, results: q });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const updateStatus = async (req: Request, res: Response) => {
  try {
    const q = await SetOr.updateOne(
      { _id: req.body._id },
      { status: req.body.status }
    );
    return res.json({ status: 200, results: q });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const getTokenLineGroup = async (req: Request, res: Response) => {
  try {
    const q = await SetOrLineGroup.find();
    return res.json({ status: 200, results: q });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const addTokenLineGroup = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const q = await SetOrLineGroup.create(data);
    return res.json({ status: 200, results: q });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const setOr = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const q = await SetOr.create(data);
    return res.json({ status: 200, results: q });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const delTokenLineGroup = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const q = await SetOrLineGroup.deleteOne({ _id: _id });
    return res.json({ status: 200, results: q });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const sendNotify = async (req: Request, res: Response) => {
  try {
    const message = { message: req.body.message };
    const resToken = await SetOrLineGroup.find();
    const registers = await Promise.all(
      resToken.map(async (item: any) => {
        const lineNotifyUrl = "https://notify-api.line.me/api/notify";
        const config = {
          method: "post",
          url: lineNotifyUrl,
          headers: {
            Authorization: `Bearer ${item.token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: message,
        };
        await axios(config);
      })
    );

    return res.json({ status: 200, results: resToken });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
