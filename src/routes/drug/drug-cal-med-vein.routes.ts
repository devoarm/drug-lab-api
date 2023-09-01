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
import {
  AddFormulas,
  GetFormula,
  GetUnitType,
} from "../../controller/drug/drugCalMedVein.controller";
import verifyToken from "../../middleware/auth";

var express = require("express");

var drugCalMedRouter = express.Router();

drugCalMedRouter.get("/unit-type", verifyToken, GetUnitType);
drugCalMedRouter.get("/get-formula", verifyToken, GetFormula);
drugCalMedRouter.post("/add-formula", verifyToken, AddFormulas);

export default drugCalMedRouter;
