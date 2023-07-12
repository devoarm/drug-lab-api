import express, { ErrorRequestHandler, Request, Response } from "express";

import moment from "moment";
import dbApp from "../../config/dbApp";
import { RolesUserType } from "../../model/roleUser.model";
// import { reqRegister } from "../../interface/auth.type";
var jwt = require("jsonwebtoken");
require("dotenv").config();
import { UserType } from "../../model/user.model";

export const GetUsers = async (req: Request, res: Response) => {
  try {
    const query = await dbApp("user as u")
      .leftJoin("sex as s", "u.sex", "s.id")
      .select("u.*", "s.sex as sex_text");
    const sqlRole = await dbApp("role_user as r")
      .leftJoin("menu as m", "r.menu_id", "m.id")
      .select("r.*", "m.text");

    const newMap = query.map((item: UserType) => {
      return {
        ...item,
        fullname: `${item.p_name}${item.f_name} ${item.l_name}`,
        role: sqlRole.filter((e: RolesUserType) => item.id == e.user_id),
      };
    });
    return res.json({ status: 200, results: newMap });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};

export const DelUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const query = await dbApp("user").where("id", id).delete();
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const AddRole = async (req: Request, res: Response) => {
  try {
    const query = await dbApp("role_user").insert(req.body);
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
