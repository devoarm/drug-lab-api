import express, { ErrorRequestHandler, Request, Response } from "express";

import {
  HosDoctor,
  HosSpclty,
  HosWard,
  getDepart,
  getGroup,
  getLeader,
  getPerson,
} from "../controller/item.controller";
import verifyToken from "../middleware/auth";

const itemRoutes = express.Router();
itemRoutes.get("/hr-group", verifyToken, getGroup);
itemRoutes.get("/hr-department", verifyToken, getDepart);
itemRoutes.get("/hr-person", verifyToken, getPerson);
itemRoutes.get("/leader", verifyToken, getLeader);
itemRoutes.get("/ward", verifyToken, HosWard);
itemRoutes.get("/spclty", verifyToken, HosSpclty);
itemRoutes.get("/doctor", verifyToken, HosDoctor);

export default itemRoutes;
