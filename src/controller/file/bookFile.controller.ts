import express, { Request, Response } from "express";
const DOCUMENT_PATH = process.env.DOCUMENT_PATH;
export const GetFileBook = async (req:Request, res:Response) => {
    try {
      var fileName = req.params.name;
      var options = {
        root: `${DOCUMENT_PATH}/bookin`,
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