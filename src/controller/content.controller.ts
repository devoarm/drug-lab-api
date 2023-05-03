import express, { Request, Response } from "express";
import MessageResponse from "../interfaces/MessageResponse";
import jwt_decode from "jwt-decode";
import dbApp from "../config/dbApp";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { reqRegister } from "../interfaces/auth.type";
import moment from "moment";
import { ADateNow } from "../util/DateUtil";

export const AddContent = async (req: Request, res: Response) => {
  try {
    const queryCon = await dbApp("contents").insert({
      title: req.body.data.title,
      detail: req.body.data.detail,
      html: req.body.data.html,
      createDate: moment().format("YYYY-MM-DD"),
      createTime: moment().format("HH:MM:ss"),
    });
    return res.json({ status: 200, results: queryCon[0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const AddRoleContent = async (req: Request, res: Response) => {
    try {
      const query = await dbApp('role_content').insert(req.body.data);
      return res.json({ status: 200, results: query });
    } catch (error: any) {
      return res.json({ status: 500, results: error.message });
    }
  };
export const AddFiles = async (req: Request, res: Response) => {
  console.log(req.files);
  try {
    return res.json({ status: 200, results: req.files });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const AddImages = async (req: Request, res: Response) => {
  console.log(req.files);
  try {
    return res.json({ status: 200, results: req.files });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
