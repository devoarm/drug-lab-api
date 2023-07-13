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
import setOrRouter from "./set-or.routes";

  
  var express = require("express");
  
  var nurseRouter = express.Router();
  
  nurseRouter.use("/set-or", setOrRouter);

  
  export default nurseRouter;
  
  
  