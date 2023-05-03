import express, { Request, Response } from "express";
import MessageResponse from "../interfaces/MessageResponse";
import jwt_decode from "jwt-decode";
import dbApp from "../config/dbApp";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { reqRegister } from "../interfaces/auth.type";
import moment from "moment";
const secret: any = process.env.SECRET_KEY;
const saltRounds = 10;

export const getRoleController = async (req: Request, res: Response) => {
  try {
    const query = await dbApp()
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};


