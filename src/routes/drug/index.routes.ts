import {
  addBox,
  addDrug,
  getDashboardDrugBox,
  getDrug,
  getDrugBox,
  getDrugBoxItem,
  getPerson,
  getServiceDrug,
  getWard,
  prepareBox,
  receiveBox,
  sendBox,
} from "../../controller/drug/drugBox.controller";
import verifyToken from "../../middleware/auth";
import drugBacklogRouter from "./drug-backlog.routes";
import drugBoxRouter from "./drug-box.routes";

var express = require("express");

var drugRouter = express.Router();

drugRouter.use("/drug-box", drugBoxRouter);
drugRouter.use("/drug-backlog", drugBacklogRouter);
/* GET home page. */
drugRouter.get("/drugbox-item", getDrugBoxItem);
drugRouter.get("/dashboard", verifyToken, getDashboardDrugBox);
drugRouter.get("/list-service", verifyToken, getServiceDrug);
drugRouter.get("/box", verifyToken, getDrugBox);

drugRouter.get("/ward", verifyToken, getWard);


drugRouter.post("/add-box", verifyToken, addBox);
drugRouter.post("/add-drug", verifyToken, addDrug);
drugRouter.get("/drug", verifyToken, getDrug);

export default drugRouter;


