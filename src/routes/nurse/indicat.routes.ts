import {
  AddIndicat,
  AddIndicatSubTitle,
  AddIndicatTitle,
  DelIndicatTitle,
  DetIndicatSubTitle,
  GetIndicat,
  GetIndicatSubTitle,
  GetIndicatTitle,
  GetOndury,
  UpdateIndicatSubTitle,
  UpdateIndicatTitle,
} from "../../controller/nurse/indicat.controller";
import { getTokenLineGroup } from "../../controller/nurse/setOrController";
import verifyToken from "../../middleware/auth";

var express = require("express");

var indicatRouter = express.Router();

indicatRouter.get("/", GetIndicat);
indicatRouter.post("/", AddIndicat);
indicatRouter.get("/title", GetIndicatTitle);
indicatRouter.post("/title", AddIndicatTitle);
indicatRouter.get("/sub-title", GetIndicatSubTitle);
indicatRouter.post("/sub-title", AddIndicatSubTitle);
indicatRouter.get("/on-duty", GetOndury);
indicatRouter.put("/title/:_id", UpdateIndicatTitle);
indicatRouter.delete("/title/:_id", DelIndicatTitle);
indicatRouter.put("/sub-title/:_id", UpdateIndicatSubTitle);
indicatRouter.delete("/sub-title/:_id", DetIndicatSubTitle);

export default indicatRouter;
