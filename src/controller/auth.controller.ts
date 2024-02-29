import express, { Request, Response } from "express";
import MessageResponse from "../interfaces/MessageResponse";
import jwt_decode from "jwt-decode";
import dbApp from "../config/dbApp";
import md5 from "md5";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { reqRegister } from "../interfaces/auth.type";
import moment from "moment";
import { UserType } from "../model/user.model";
import { RolesUserType } from "../model/roleUser.model";
import dbOffice from "../config/dbOffice";
const secret: any = process.env.SECRET_KEY;
const saltRounds = 10;

export const LoginController = async (req: Request, res: Response) => {
  let body = req.body;
  try {
    if (body.username == "admin" && body.password == "1234") {
      var token = jwt.sign(
        {
          ...body
        },
        secret
      );
      return res.json({
        status: 200,
        msg: "success",
        results: token,
      });
    }
    return res.json({
      status: 301,
      msg: "no user",
    });
  } catch (error: any) {
    return res.json({ status: 500, err: error.message });
  }
};
