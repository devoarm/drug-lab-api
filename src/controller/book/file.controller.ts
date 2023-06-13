const saltRounds = 10;
var jwt = require("jsonwebtoken");
import express, { Request, Response } from "express";
var jwt = require("jsonwebtoken");
require("dotenv").config();
import dbOffice from "../../config/dbOffice";

import multer from "multer";

require("dotenv").config();
const DOCUMENT_BOOKIN_PATH = process.env.DOCUMENT_BOOKIN_PATH;
const secret = process.env.SECRET_KEY;
import path from "path";
var glob = require("glob");

export const CheckFile = async (req:Request, res:Response) => {
  const { name } = req.params;
  glob(`${DOCUMENT_BOOKIN_PATH}/bookin/${name}`, function (err:any, files:any) {
    if (files.length > 0) {
      console.log(files);
      return res.json({ status: 200, msg: "has data" });
    } else {
      return res.json({ status: 500, msg: "has not data" });
    }
  });
};

export const GetFile = async (req:Request, res:Response) => {
  try {
    var fileName = req.params.name;

    const b = fileName.slice(fileName.length - 4, fileName.length);
    if (b == "null") {
      fileName = `${fileName.slice(0, fileName.length - 4)}.pdf`;
      console.log(fileName);
    }
    var options = {
      root: `${DOCUMENT_BOOKIN_PATH}`,
    };
    res.sendFile(fileName, options, function (err) {
      if (err) {
        return res.json({ status: 500, msg: err.message });
      } else {
        return;
      }
    });
  } catch (error:any) {
    return res.json({ status: 500, msg: error.message });
  }
};
export const updateFile = async (req:Request, res:Response) => {
  try {
    const { filename } = req.params;
    const storage = multer.diskStorage({
      destination: function (req:Request, file, callback) {
        callback(null, `${DOCUMENT_BOOKIN_PATH}/bookin`);
      },
      filename: function (req:Request, file, callback) {
        console.log(`${filename}.${file.fieldname}`);
        // const ext = file.mimetype.split("/").filter(Boolean).slice(1).join("/");
        // callback(null, `${filename}.${ext}`);
        callback(null, `${filename}.${file.fieldname}`);
      },
    });
    var upload = multer({ storage: storage }).array("pdf", 100);
    upload(req, res, function (err) {
      if (err) {
        console.log("error");
        console.log(err);
        return res.json({ status: 500, results: "no" });
      } else {
        return res.json({ status: 200, results: "ok" });
      }
    });
  } catch (error:any) {
    console.log("error");
    console.log(error.message);
  }
};


