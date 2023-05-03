import express from "express";
import { GetFileBook } from "../controller/file/bookFile.controller";

import MessageResponse from "../interfaces/MessageResponse";
import emojis from "./emojis";

const fileRouter = express.Router();

fileRouter.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    status: 200,
    results: "Auth API - 👋🌎🌍🌏",
  });
});
fileRouter.get("/book-index/:name",GetFileBook);


export default fileRouter;
