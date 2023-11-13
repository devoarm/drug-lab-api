import {
  AddIndicatSubTitle,
  AddIndicatTitle,
  GetIndicatSubTitle,
  GetIndicatTitle,
  GetOndury,
} from "../../controller/nurse/indicat.controller";
import { getTokenLineGroup } from "../../controller/nurse/setOrController";
import verifyToken from "../../middleware/auth";

var express = require("express");

var indicatRouter = express.Router();

indicatRouter.get("/title", GetIndicatTitle);
indicatRouter.post("/title", AddIndicatTitle);
indicatRouter.get("/sub-title", GetIndicatSubTitle);
indicatRouter.post("/sub-title", AddIndicatSubTitle);
indicatRouter.get("/on-duty", GetOndury);

export default indicatRouter;
