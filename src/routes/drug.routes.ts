import { addBox, addDrug, getDashboardDrugBox, getDrug, getDrugBox, getPerson, getServiceDrug, getWard, prepareBox, receiveBox, sendBox } from "../controller/drug/drugBox.controller";

var express = require("express");


var drugRouter = express.Router()

/* GET home page. */
drugRouter.get("/dashboard", getDashboardDrugBox);
drugRouter.get("/list-service", getServiceDrug);
drugRouter.get("/box", getDrugBox);
drugRouter.get("/person", getPerson);
drugRouter.get("/ward", getWard);
drugRouter.post("/send-box", sendBox);
drugRouter.post("/receive-box", receiveBox);
drugRouter.post("/prepare-box", prepareBox);
drugRouter.post("/add-box", addBox);
drugRouter.post("/add-drug", addDrug);
drugRouter.get("/drug", getDrug);

export default drugRouter;
