import express, { ErrorRequestHandler, Request, Response } from "express";
import {
  AddRole,
  DelUser,
  GetUsers,
} from "../controller/admin/users.controller";

export const usersRoutes = express.Router();

usersRoutes.get("/", GetUsers);
usersRoutes.post("/role", AddRole);
usersRoutes.delete("/:id", DelUser);
