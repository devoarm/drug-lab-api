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
import { CheckFile, GetFile, updateFile } from "../../controller/book/file.controller";

const fileRouter = express.Router();

fileRouter.get("/book-index", GetFile);
fileRouter.get("/check/:name", CheckFile);
fileRouter.get("/book-index/:name", GetFile);
// fileRouter.post("/update-book/:filename", multipartUpload, updateFile);
fileRouter.post("/update-book/:filename", updateFile);

export default fileRouter;
