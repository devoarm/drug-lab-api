import verifyToken from "../../middleware/auth";

var express = require("express");

var setOrRouter = express.Router();

setOrRouter.get("/dashboard");

export default setOrRouter;
