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
    c.id as content_id,
    c.cat_id as cat_id,
    c.user_id as user_id,
    u.username as cid,
    CONCAT(u.f_name,' ',u.l_name) as fullname,
    u.email as email, 
    cat.name,
    c.ref as ref,
    c.subject as subject,
    c.description as descrition,
    c.content_file as content_file,
    c.attach_files as attach_file,
    c.content_date as content_date
    FROM workbase.user u
    LEFT JOIN frontend.content c on c.user_id = u.id
    LEFT JOIN frontend.cat cat on cat.id = c.cat_id
    WHERE cat.active = 1
    ORDER BY c.id DESC
    LIMIT ${limit}`);
    res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    res.json({ status: 500, results: error.message });
  }
});
blogRouter.post("/", AddContent);

export default blogRouter;
