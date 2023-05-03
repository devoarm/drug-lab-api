import express from "express";
import dbOffice from "../../config/dbOffice";
import {
  LoginController,
  MeController,
  RegisterController,
} from "../../controller/auth.controller";
import { getBookById, getBookCheck } from "../../controller/book/secretary.controller";

import MessageResponse from "../../interfaces/MessageResponse";
import emojis from "../emojis";
import secretaryRouter from "./secretary.routes";

const bookRouter = express.Router();

bookRouter.get<{}, MessageResponse>("/", async (req, res) => {
  const query = await dbOffice("book_index_send_leader").limit(5);
  res.json({
    status: 200,
    results: query,
  });
});
bookRouter.get("/:idBook", getBookById);
bookRouter.use("/secretary", secretaryRouter);

export default bookRouter;
