import express, { ErrorRequestHandler, Request, Response } from "express";
import moment from "moment";
import dbApp from "../../config/dbApp";
// import { reqRegister } from "../../interface/auth.type";

var jwt = require("jsonwebtoken");
require("dotenv").config();

export const GetMenu = async (req: Request, res: Response) => {
  const query = await dbApp("menu")
    .select("*")
    .where("isActive", "Y")
    .orderBy("index");
  const mapQuery = query.map((item: any) => {
    return { ...item, droppable: item.droppable == "1" ? true : false };
  });
  return res.json({ status: 200, results: mapQuery });
};
export const GetMenuRole = async (req: Request, res: Response) => {
  try {
    const query = await dbApp("menu")
      .select("id", "text")
      .where("isActive", "Y")
      .orderBy("index");
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error });
  }
};
export const AddMenu = async (req: Request, res: Response) => {
  const data: any = req.body;
  try {
    const query = await dbApp("menu").insert(data);
    const updateAction = await dbApp("menu")
      .where("id", query[0])
      .update({ action: `${query[0]}` });
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const UpdateDetailMenu = async (req: Request, res: Response) => {
  const data: any = req.body;
  try {
    const query = await dbApp("menu").where("id", data.id).update(data);
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const UpdateIndexMenu = async (req: Request, res: Response) => {
  const data: any = req.body;
  try {
    const query = await dbApp("menu")
      .where("id", data.id)
      .update({ index: data.index });
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const DeleteMenu = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const query = await dbApp("menu")
      .where("id", id)
      .update({ isActive: "N" });
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
