import express from "express";
import moment from "moment";
import multer from "multer";
import dbApp from "../config/dbApp";
import {
  AddContent,
  AddFiles,
  AddImages,
  AddRoleContent,
} from "../controller/content.controller";

import MessageResponse from "../interfaces/MessageResponse";
import emojis from "./emojis";
import dbWebBlog from "../config/dbWebBlog";

const blogRouter = express.Router();

blogRouter.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    const query = await dbWebBlog.raw(`SELECT 
    c.*,
    cat.icon,
    cat.name
  FROM content c
  LEFT JOIN cat cat on c.cat_id = cat.id
  WHERE cat.active = '1'
  ORDER BY c.id DESC
  LIMIT ${limit}
  
  `);
    res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    res.json({ status: 500, results: error.message });
  }
});
blogRouter.post("/", AddContent);

export default blogRouter;
