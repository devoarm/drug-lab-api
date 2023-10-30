import {
  AddFormulas,
  DelFormulas,
  GetFormula,
  GetUnitType,
  UpdateFormulas,
} from "../../controller/drug/drugCalMedVein.controller";
import verifyToken from "../../middleware/auth";

var express = require("express");

var drugCalMedRouter = express.Router();

drugCalMedRouter.get("/unit-type", verifyToken, GetUnitType);
drugCalMedRouter.get("/get-formula", verifyToken, GetFormula);
drugCalMedRouter.post("/add-formula", verifyToken, AddFormulas);
drugCalMedRouter.delete("/formula/:_id", verifyToken, DelFormulas);
drugCalMedRouter.put("/formula/:_id", verifyToken, UpdateFormulas);

export default drugCalMedRouter;
