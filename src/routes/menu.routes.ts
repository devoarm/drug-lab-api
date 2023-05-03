import express, { ErrorRequestHandler, Request, Response } from "express";
import {
  AddMenu,
  DeleteMenu,
  GetMenu,
  GetMenuRole,
  UpdateDetailMenu,
  UpdateIndexMenu,
} from "../controller/admin/menu.controller";

export const menuRoutes = express.Router();

menuRoutes.get("/", GetMenu);
menuRoutes.get("/role", GetMenuRole);
menuRoutes.post("/", AddMenu);
menuRoutes.put("/", UpdateDetailMenu);
menuRoutes.delete("/:id", DeleteMenu);
menuRoutes.post("/update-index", UpdateIndexMenu);
