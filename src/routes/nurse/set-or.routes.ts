import { addTokenLineGroup, delTokenLineGroup, getSetOr, getTokenLineGroup, sendNotify, setOr, updateStatus } from "../../controller/nurse/setOrController";
import verifyToken from "../../middleware/auth";

var express = require("express");

var setOrRouter = express.Router();

setOrRouter.post("/",setOr);
setOrRouter.get("/",getSetOr);
setOrRouter.put("/change-status",updateStatus);
setOrRouter.get("/token-line-group",getTokenLineGroup);
setOrRouter.post("/add-token-line-group",addTokenLineGroup);
setOrRouter.post("/send-notify",sendNotify);
setOrRouter.delete("/token-line-group/:_id",delTokenLineGroup);

export default setOrRouter;
