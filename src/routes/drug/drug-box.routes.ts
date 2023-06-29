import {
  DelDrugBox,
  DelDrugItem,
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
drugBoxRouter.post("/add-item", verifyToken, addDrug);
drugBoxRouter.post("/prepare-box", verifyToken, prepareBox);
drugBoxRouter.post("/send-box", verifyToken, sendBox);
drugBoxRouter.post("/receive-box", verifyToken, receiveBox);
drugBoxRouter.post("/add-box", verifyToken, addBox);
drugBoxRouter.get("/ward",verifyToken, getWard);
drugBoxRouter.get("/specified",verifyToken, getSpecified);
drugBoxRouter.delete("/del-box/:_id",verifyToken, DelDrugBox);
drugBoxRouter.delete("/del-item/:_id",verifyToken, DelDrugItem);

export default drugBoxRouter;



