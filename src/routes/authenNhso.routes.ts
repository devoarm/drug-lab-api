import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import emojis from "./emojis";
import verifyToken from "../middleware/auth";
import {
  checkAuthByDate,
  getRegisterNhso,
  registerNhso,
} from "../controller/authNhso.controller";

const authenNhsoRouter = express.Router();

authenNhsoRouter.get("/check-auth/:date", checkAuthByDate);
authenNhsoRouter.post("/register", verifyToken, registerNhso);
authenNhsoRouter.get("/:pid", verifyToken, getRegisterNhso);

export default authenNhsoRouter;
