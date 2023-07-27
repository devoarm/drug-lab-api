import express from "express";

import {
  SendToCheck,
  UpdateBooks,
  UpdateFileWebBooks,
  addBooks,
  addFileBooks,
  bookStaf,
  changeLeader,
  convertBookToNoSql,
  getMaxBook,
} from "../../controller/book/staf.controller";




const stafRouter = express.Router();

stafRouter.post("/book", bookStaf);

stafRouter.get("/convert-to-nosql", convertBookToNoSql);
stafRouter.post("/changeLeader", changeLeader);
stafRouter.get("/max-num", getMaxBook);
stafRouter.post("/add-file-book/:num", addFileBooks);
stafRouter.post("/update-file-book/:num", UpdateFileWebBooks);
stafRouter.put("/update-book/:idBook", UpdateBooks);
stafRouter.post("/add-book", addBooks);
stafRouter.post("/send-to-check", SendToCheck);

export default stafRouter;
