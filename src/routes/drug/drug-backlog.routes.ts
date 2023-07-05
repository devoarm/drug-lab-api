import { FollowVisit, GetStalByHn, GetStalVn, GetVnApp, GetVnByHn, SearchPatient, SearchPatientByVn, SearchVn, } from "../../controller/drug/drugBacklog.controller";
import verifyToken from "../../middleware/auth";

  
  var express = require("express");
  
  var drugBacklogRouter = express.Router();
  drugBacklogRouter.get("/get-stal-vn",verifyToken, GetStalVn);
  drugBacklogRouter.get("/get-stal-by-hn/:hn",verifyToken, GetStalByHn);
  drugBacklogRouter.post("/add-visit", verifyToken,FollowVisit);
  drugBacklogRouter.get("/search-vn/:vn",verifyToken, SearchVn);
  drugBacklogRouter.get("/get-vn-app/:vn",verifyToken, GetVnApp);
  drugBacklogRouter.get("/vn-by-hn/:hn", GetVnByHn);
  drugBacklogRouter.get("/search-patient/:slug", SearchPatient);
  drugBacklogRouter.get("/search-patient-vn/:vn",verifyToken, SearchPatientByVn);

  
  export default drugBacklogRouter;
  
  
  
  