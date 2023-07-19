import express, { ErrorRequestHandler, Request, Response } from "express";
import { UseRoleNotifyLine, getRoleByIdPerson } from "../controller/role.controller";

const roleRoutes = express.Router();

roleRoutes.get("/:id", getRoleByIdPerson);
roleRoutes.post("/send-line-notify", UseRoleNotifyLine);

export default roleRoutes;
