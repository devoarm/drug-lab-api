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
    const checkLogin = await dbOffice("hr_person")
      .leftJoin("hr_prefix as pf", "pf.HR_PREFIX_ID", "hr_person.HR_PREFIX_ID")
      .where("HR_USERNAME", body.username)
      .andWhere("HR_PASSWORD", md5(body.password))
      .limit(1);
    if (checkLogin.length > 0) {
      const getRole = await dbOffice("sys_permis_list").where(
        "PERSON_ID",
        checkLogin[0].ID
      );
      const roleMap = getRole.map((item) => {
        return item.PERMIS_ID;
      });
      var token = jwt.sign(
        {
          username: checkLogin[0].HR_USERNAME,
          userId: checkLogin[0].ID,
          hr_department_id: checkLogin[0].HR_DEPARTMENT_ID,
          hr_department_sub_id: checkLogin[0].HR_DEPARTMENT_SUB_ID,
          role: roleMap,
          p_name: checkLogin[0].HR_PREFIX_NAME,
          f_name: checkLogin[0].HR_FNAME,
          l_name: checkLogin[0].HR_LNAME,
          leaderId: process.env.LEADER_ID,
          leaderName: process.env.LEADER_NAME,
        },
        secret,
        { expiresIn: "4h" }
      );
      return res.json({
        status: 200,
        msg: "success",
        results: token,
        // logs: checkLogin
        // role: roleMap,
      });
    } else {
      return res.json({
        status: 401,
        msg: "noUser",
      });
    }
  } catch (error: any) {
    return res.json({ status: 500, err: error.message });
  }
};

export const RegisterController = async (req: Request, res: Response) => {
  const form: reqRegister = req.body;
  try {
    const checkUsername = await dbApp("user").where(
      "username",
      form.username
    );
    if (checkUsername.length > 0) {
      return res.json({ status: 301, results: "user used" });
    } else {
      bcrypt
        .hash(form.password, saltRounds)
        .then(async (hash: any) => {
          const insertUser = await dbApp("user").insert({
            ...form,
            password: hash,
            create_at: moment().format("YYYY-MM-DD HH:MM:ss"),
          });

          return res.json({ status: 200, results: insertUser[0] });
        })
        .catch((err: any) => {
          console.error(err.message);
          return res.json({ status: 500, results: err.message });
        });
    }
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};

export const MeController = async (req: Request, res: Response) => {
  const { token } = req.params;
  try {
    var decoded: any = jwt_decode(token);
    res.json({ status: 200, results: decoded });
  } catch (error: any) {
    res.status(500).json({ status: 500, results: error.message });
  }
};
