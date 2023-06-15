import { FollowVisit, SearchPatientByHn, SearchPatientByVn, SearchVn, findVn } from "../../controller/drug/drugBacklog.controller";
import verifyToken from "../../middleware/auth";

  
  var express = require("express");
  
  var drugBacklogRouter = express.Router();
  
  drugBacklogRouter.get("/search-vn/:vn",verifyToken, SearchVn);
  drugBacklogRouter.get("/search-patient-hn/:slug", SearchPatientByHn);
  drugBacklogRouter.get("/search-patient-vn/:vn",verifyToken, SearchPatientByVn);
  drugBacklogRouter.post("/follow-visit", verifyToken,FollowVisit);
  drugBacklogRouter.get("/find-vn/:vn",verifyToken, findVn);

  
  export default drugBacklogRouter;
  
  
  
  