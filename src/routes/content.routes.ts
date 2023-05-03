import express from "express";
import moment from "moment";
import multer from "multer";
import dbApp from "../config/dbApp";
import { AddContent, AddFiles, AddImages, AddRoleContent } from "../controller/content.controller";

import MessageResponse from "../interfaces/MessageResponse";
import emojis from "./emojis";

const contentRoutes = express.Router();

const storageFiles = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, `./upload/contents/files`);
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploadFiles = multer({ storage: storageFiles });

const storageImages = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, `./upload/contents/images`);
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploadImages = multer({ storage: storageImages });

contentRoutes.get("/", async (req, res) => {
    const query = await dbApp('contents')
  return res.send(query);
});
contentRoutes.post("/", AddContent);
contentRoutes.post("/role-content", AddRoleContent);
contentRoutes.post("/upload-files", uploadFiles.array("files"), AddFiles);
contentRoutes.post("/upload-images", uploadImages.array("images"), AddImages);

export default contentRoutes;
