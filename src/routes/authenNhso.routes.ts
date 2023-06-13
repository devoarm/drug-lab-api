import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import emojis from "./emojis";
import verifyToken from "../middleware/auth";
import {
  getRegisterNhso,
  registerNhso,
} from "../controller/authNhso.controller";

const authenNhsoRouter = express.Router();


authenNhsoRouter.post("/register", registerNhso);
authenNhsoRouter.get("/:pid", getRegisterNhso);

export default authenNhsoRouter;
