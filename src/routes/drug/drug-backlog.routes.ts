import { FollowVisit, GetStalByHn, GetStalVn, GetVnApp, GetVnByHn, SearchPatient, SearchPatientByVn, SearchVn, UpdateContact, } from "../../controller/drug/drugBacklog.controller";
import verifyToken from "../../middleware/auth";

  
  var express = require("express");
  
  var drugBacklogRouter = express.Router();
  drugBacklogRouter.get("/get-stal-vn",verifyToken, GetStalVn);
  drugBacklogRouter.get("/get-stal-by-hn/:hn",verifyToken, GetStalByHn);
  drugBacklogRouter.put("/edit-contact/:vn",verifyToken, UpdateContact);
  drugBacklogRouter.post("/add-visit", verifyToken,FollowVisit);
  drugBacklogRouter.get("/search-vn/:vn",verifyToken, SearchVn);
  drugBacklogRouter.get("/get-vn-app/:vn",verifyToken, GetVnApp);
  drugBacklogRouter.get("/vn-by-hn/:hn",verifyToken, GetVnByHn);
  drugBacklogRouter.get("/search-patient/:slug",verifyToken, SearchPatient);
  drugBacklogRouter.get("/search-patient-vn/:vn",verifyToken, SearchPatientByVn);

  
  export default drugBacklogRouter;
  
  
  
  