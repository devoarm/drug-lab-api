import express, { ErrorRequestHandler, Request, Response } from "express";
import moment from "moment";
import HosNavigatorModel from "../model/app/hosNavigator.model";
import multer from "multer";
import path from "path";

// import { reqRegister } from "../../interface/auth.type";

var jwt = require("jsonwebtoken");
require("dotenv").config();

export const GetDep = async (req: Request, res: Response) => {
  const query = await HosNavigatorModel.find(
    {},
    { __v: 0, createdAt: 0, updatedAt: 0 }
  ).sort({
    index: 1,
    emphasis:-1
  });
  return res.json({ status: 200, results: query });
};
export const GetDepByParent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = await HosNavigatorModel.find(
    { parent: id },
    { __v: 0, createdAt: 0, updatedAt: 0 }
  ).sort({
    index: 1,
  });
  return res.json({ status: 200, results: query });
};
export const SearchDep = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const query = await HosNavigatorModel.find(
      { text: { $regex: `.*${slug}.*` } },
      { __v: 0, createdAt: 0, updatedAt: 0 }
    );
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};

export const GetDepById = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const query = await HosNavigatorModel.findOne(
      { _id: _id },
      { __v: 0, createdAt: 0, updatedAt: 0 }
    );
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }

  // const mapQuery = {
  //   ...query,
  //   noDel: query?.noDel == "Y" ? true : false,
  //   droppable: query?.droppable == "1" ? true : false,
  //   action: query?.public ? "public" : query?.action,
  //   externalLink: query?.externalLink == "1" ? true : false,
  //   public: query?.public == "1" ? true : false,
  // };
  // return res.json({ status: 200, results: mapQuery });
};

export const AddDep = async (req: Request, res: Response) => {
  try {
    const projectRoot = path.resolve(__dirname, "../../upload/diagrams-hos"); // Move up one directory

    const storage = multer.diskStorage({
      destination: function (req: Request, file, callback) {
        callback(null, projectRoot);
      },
      filename: function (req: Request, file, callback) {
        callback(null, Date.now() + "-" + file.originalname);
      },
    });
    var upload = multer({ storage: storage }).single("img");

    upload(req, res, async function (err) {
      if (err) {
        return res.json({ status: 500, results: err.message });
      } else {
        const jsonData = JSON.parse(req.body.data); // Parsed JSON data
        const finalData = { ...jsonData, img: req.file?.filename };
        const updateD = await HosNavigatorModel.create(finalData);
        return res.json({
          status: 200,
          results: updateD.toJSON(),
        });
      }
    });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const UpdateDetailDep = async (req: Request, res: Response) => {
  // const data: any = req.body.data;
  // try {
  //   const query = await dbBlog("Dep").where("id", data.id).update(data);
  //   return res.json({ status: 200, results: query });
  // } catch (error: any) {
  //   return res.json({ status: 500, results: error.message });
  // }
};
export const UpdateIndexDep = async (req: Request, res: Response) => {
  const data: any = req.body;

  try {
    const delMeny = await HosNavigatorModel.deleteMany();
    const query = await HosNavigatorModel.insertMany(data);
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const UploadImgDev = async (req: Request, res: Response) => {
  try {
    const projectRoot = path.resolve(__dirname, "../../upload/diagrams-hos"); // Move up one directory

    const storage = multer.diskStorage({
      destination: function (req: Request, file, callback) {
        callback(null, projectRoot);
      },
      filename: function (req: Request, file, callback) {
        callback(null, Date.now() + "-" + file.originalname);
      },
    });
    var upload = multer({ storage: storage }).single("img");

    upload(req, res, async function (err) {
      if (err) {
        return res.json({ status: 500, results: err.message });
      } else {
        const jsonData = JSON.parse(req.body.data); // Parsed JSON data
        const finalData = { ...jsonData, img: req.file?.filename };
        const updateD = await HosNavigatorModel.create(finalData);
        return res.json({
          status: 200,
          results: updateD.toJSON(),
        });
      }
    });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const UpdateImgDev = async (req: Request, res: Response) => {
  try {
    const projectRoot = path.resolve(__dirname, "../../upload/diagrams-hos"); // Move up one directory

    const storage = multer.diskStorage({
      destination: function (req: Request, file, callback) {
        callback(null, projectRoot);
      },
      filename: function (req: Request, file, callback) {
        callback(null, Date.now() + "-" + file.originalname);
      },
    });
    var upload = multer({ storage: storage }).single("img");

    upload(req, res, async function (err) {
      if (err) {
        return res.json({ status: 500, results: err.message });
      } else {
        const jsonData = JSON.parse(req.body.data);
        const finalData = { ...jsonData, img: req.file?.filename };        
        // return
        const updateD = await HosNavigatorModel.updateOne(
          { _id: finalData._id },
          { ...finalData }
        );
        return res.json({
          status: 200,
          results: updateD,
        });
      }
    });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};

export const DeleteDep = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const query = await HosNavigatorModel.deleteOne({ _id: _id });
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
