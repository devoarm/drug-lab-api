import express from "express";

import { UpdateBooks, addBooks, addFileBooks, bookStaf, changeLeader, convertBookToNoSql, getBookType, getMaxBook, getOrg, getOrgIn, getUrgent } from "../../controller/book/staf.controller";


const stafRouter = express.Router();

stafRouter.get("/book", bookStaf);
stafRouter.get("/org", getOrg);
stafRouter.get("/org-in", getOrgIn);
stafRouter.get("/book-type", getBookType);
stafRouter.get("/urgent", getUrgent);
stafRouter.get("/convert-to-nosql", convertBookToNoSql);
stafRouter.post("/changeLeader", changeLeader);
stafRouter.get("/max-num", getMaxBook);
stafRouter.post("/add-file-book/:num", addFileBooks);
stafRouter.put("/update-book/:idBook", UpdateBooks);
stafRouter.post("/add-book/:num", addBooks);

export default stafRouter;
