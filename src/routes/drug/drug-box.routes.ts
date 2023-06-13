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

drugBoxRouter.get("/dashboard",verifyToken, getDashboardDrugBox);
drugBoxRouter.get("/item",verifyToken, getDrugBoxItem);
drugBoxRouter.get("/person", verifyToken, getPerson);
drugBoxRouter.get("/box", verifyToken,getDrugBox);
drugBoxRouter.post("/prepare-box", verifyToken, prepareBox);
drugBoxRouter.post("/send-box", verifyToken, sendBox);
drugBoxRouter.post("/receive-box", verifyToken, receiveBox);
drugBoxRouter.get("/ward",verifyToken, getWard);
drugBoxRouter.get("/specified",verifyToken, getSpecified);

export default drugBoxRouter;



