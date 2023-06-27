import express from "express";
import dbOffice from "../../config/dbOffice";
import {
  LoginController,
  MeController,
  RegisterController,
} from "../../controller/auth.controller";
import {
  getBookById,
  getBookCheck,
} from "../../controller/book/secretary.controller";

import MessageResponse from "../../interfaces/MessageResponse";
import emojis from "../emojis";
import secretaryRouter from "./secretary.routes";
import {
  AddBookYear,
  BookDirector,
  BookHistoryLeader,
  BookHistoryPerson,
  BookIndexCountDep,
  BookIndexCountGroup,
  BookIndexLeaderDecide,
  BookIndexLeaderSign,
  BookIndexPerson,
  BookIndexSendDep,
  BookIndexSendGroup,
  BookIndexSendLeader,
  BookInsert,
  BookOnRead,
  BookReadAllGroup,
  BookReading,
  BookSendPerson,
  BookSendToSecretary,
  BookSendToSign,
  BookUpdatePdf,
  GetBookById,
  GetBookYear,
  getBookType,
  getOrg,
  getOrgIn,
  getSecret,
  getUrgent,
} from "../../controller/book";
import verifyToken from "../../middleware/auth";
import fileRouter from "./file.routes";
import personRouter from "./person.routes";
import stafRouter from "./staf.routes";

const bookRouter = express.Router();

bookRouter.use("/secretary", secretaryRouter);
bookRouter.use("/file", fileRouter);
bookRouter.use("/person", personRouter);
bookRouter.use("/staf", stafRouter);

bookRouter.get<{}, MessageResponse>("/", async (req, res) => {
  // const query = await dbOffice("book_index_send_leader").limit(5);
  return res.json({ status: 200, results: "ok" });
});
// bookRouter.get("/", BookDirector);

bookRouter.post("/book-insert", BookInsert);

bookRouter.post("/book-send-to-secretary", BookSendToSecretary);
bookRouter.post("/book-index-person/readed", BookOnRead);
bookRouter.get("/book-index-history-person", BookHistoryPerson);
bookRouter.get("/book-index-history-leader", BookHistoryLeader);

bookRouter.post("/book-reading", BookReading);
bookRouter.post("/book-read-all-group", BookReadAllGroup);

//new database
bookRouter.get("/org", getOrg);
bookRouter.get("/org-in", getOrgIn);
bookRouter.get("/book-type", getBookType);
bookRouter.get("/urgent", getUrgent);
bookRouter.get("/secret", getSecret);
bookRouter.get("/year", GetBookYear);
bookRouter.post("/year", AddBookYear);
bookRouter.get("/book-send-person", BookSendPerson);
bookRouter.get("/:id", GetBookById);
bookRouter.post("/send-to-sign/:_id", BookSendToSign);
//end new database

// bookRouter.get("/:idBook", getBookById);
bookRouter.get("/book-index-send-leader/:id", BookIndexSendLeader);
bookRouter.post("/book-index-update-pdf/:id", BookUpdatePdf);
bookRouter.post("/book-index-leader-sign/:id", BookIndexLeaderSign);
bookRouter.get("/book-index-person/:id", verifyToken, BookIndexPerson);
bookRouter.get("/book-index-leader-decide/:bookId", BookIndexLeaderDecide);
bookRouter.get("/book-count-dep/:idDep/:userId/:read", BookIndexCountDep);
bookRouter.get("/book-count-group/:idDep/:userId/:read", BookIndexCountGroup);
bookRouter.get("/book-send-dep/:idDep/:limit/:userId/:read", BookIndexSendDep);
bookRouter.get(
  "/book-send-group/:idDep/:limit/:userId/:read",
  BookIndexSendGroup
);

export default bookRouter;
