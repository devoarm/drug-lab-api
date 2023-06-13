import express, { Request, Response } from "express";
import MessageResponse from "../interfaces/MessageResponse";
import jwt_decode from "jwt-decode";
import dbApp from "../config/dbApp";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { reqRegister } from "../interfaces/auth.type";
import moment from "moment";
import Authens from "../model/app/authens.model";
const secret: any = process.env.SECRET_KEY;
const saltRounds = 10;

export const getRegisterNhso = async (req: Request, res: Response) => {
  const { pid } = req.params;
  try {
    const query = await Authens.find({ pid: pid });
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const registerNhso = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const query = await Authens.create(data);
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
