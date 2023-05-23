import {
  addBox,
  addDrug,
  getDashboardDrugBox,
  getDrug,
  getDrugBox,
  getDrugBoxItem,
  getPerson,
  getServiceDrug,
  getSpecified,
  getWard,
  prepareBox,
  receiveBox,
  sendBox,
} from "../../controller/drug/drugBox.controller";
import verifyToken from "../../middleware/auth";

var express = require("express");

var drugBoxRouter = express.Router();

drugBoxRouter.get("/dashboard", getDashboardDrugBox);
drugBoxRouter.get("/item", getDrugBoxItem);
drugBoxRouter.get("/person", verifyToken, getPerson);
drugBoxRouter.get("/box", getDrugBox);
drugBoxRouter.post("/prepare-box", verifyToken, prepareBox);
drugBoxRouter.post("/send-box", verifyToken, sendBox);
drugBoxRouter.post("/receive-box", verifyToken, receiveBox);
drugBoxRouter.get("/ward", getWard);
drugBoxRouter.get("/specified", getSpecified);

export default drugBoxRouter;



