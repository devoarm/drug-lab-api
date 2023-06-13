import express, { ErrorRequestHandler, Request, Response } from "express";

import { getDepart, getGroup, getLeader, getPerson } from "../controller/item.controller";

const itemRoutes = express.Router();
itemRoutes.get("/hr-group", getGroup);
itemRoutes.get("/hr-department", getDepart);
itemRoutes.get("/hr-person", getPerson);
itemRoutes.get("/leader", getLeader);

export default itemRoutes;
