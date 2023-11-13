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
import indicatRouter from "./indicat.routes";
import setOrRouter from "./set-or.routes";

  
  var express = require("express");
  
  var nurseRouter = express.Router();
  
  nurseRouter.use("/set-or", setOrRouter);
  nurseRouter.use("/indicat", indicatRouter);

  
  export default nurseRouter;
  
  
  