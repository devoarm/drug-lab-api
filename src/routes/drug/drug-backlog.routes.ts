import { FollowVisit, SearchPatientByVn, SearchVn, findVn } from "../../controller/drug/drugBacklog.controller";

  
  var express = require("express");
  
  var drugBacklogRouter = express.Router();
  
  drugBacklogRouter.get("/search-vn/:vn", SearchVn);
  drugBacklogRouter.get("/search-patient-vn/:vn", SearchPatientByVn);
  drugBacklogRouter.post("/follow-visit", FollowVisit);
  drugBacklogRouter.get("/find-vn/:vn", findVn);

  
  export default drugBacklogRouter;
  
  
  
  