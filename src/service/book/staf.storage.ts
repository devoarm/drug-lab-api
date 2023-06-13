import multer from "multer";
import express, { Request, Response } from "express";
require("dotenv").config();
const DOCUMENT_BOOKIN_PATH = process.env.DOCUMENT_BOOKIN_PATH;

const storage = multer.diskStorage({
  destination: function (req: Request, file, callback) {
    callback(null, `${DOCUMENT_BOOKIN_PATH}/bookin`);
  },
  filename: function (req: Request, file, callback) {
    const { filename } = req.params;
    console.log(`${filename}.${file.fieldname}`);
    // const ext = file.mimetype.split("/").filter(Boolean).slice(1).join("/");
    // callback(null, `${filename}.${ext}`);
    callback(null, `${filename}.${file.fieldname}`);
  },
});
