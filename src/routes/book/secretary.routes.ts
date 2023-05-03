import express from "express";
import dbOffice from "../../config/dbOffice";
import {
  LoginController,
  MeController,
  RegisterController,
} from "../../controller/auth.controller";
import { getBookById, getBookCheck, secretaryAccept, secretaryReject } from "../../controller/book/secretary.controller";

import MessageResponse from "../../interfaces/MessageResponse";
import emojis from "../emojis";

const secretaryRouter = express.Router();

secretaryRouter.get("/check", getBookCheck);
secretaryRouter.get("/accept/:idBook", secretaryAccept);
secretaryRouter.get("/reject/:idBook", secretaryReject);

export default secretaryRouter;
