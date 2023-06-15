import express, { Request, Response } from "express";
import dbOffice from "../../config/dbOffice";
import BookOrgs from "../../model/app/bookOrgs.model";
import BookOrgIns from "../../model/app/bookOrgIns.model";
import BookTypes from "../../model/app/bookTypes.model";
import BookUrgents from "../../model/app/bookUrgents.model";
import multer from "multer";
import fs from "fs";
import moment from "moment";
import BookIns from "../../model/app/bookIns.model";
import Leader from "../../model/app/leaders.model";

require("dotenv").config();
const DOCUMENT_BOOKIN_PATH = process.env.DOCUMENT_BOOKIN_PATH;

export const bookStaf = async (req: Request, res: Response) => {
  try {
    const query = await BookIns.find();
    res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const searchBooks = async (req: Request, res: Response) => {
  const query = await dbOffice("book_index_send_leader as bl")
    .leftJoin("book_index as b", "bl.BOOK_ID", "b.ID")
    .leftJoin("book_index_img as bi", "bi.BOOK_ID", "b.ID")
    .leftJoin("book_urgent as bu", "b.BOOK_URGENT_ID", "bu.URGENT_ID")
    .where("bl.SEND_STATUS", "SEND")
    .orderBy([
      // { column: "bl.TOP_LEADER_AC_DATE_TIME", order: "desc" },
      { column: "bl.SEND_LD_DATE_TIME", order: "desc" },
    ])
    .select(
      "b.ID as BOOK_ID",
      "b.BOOK_NAME",
      "b.BOOK_NUMBER",
      "b.BOOK_DETAIL",
      "b.BOOK_URGENT_ID",
      "bu.URGENT_NAME",
      "bl.*",
      "bi.ID as BOOK_IMAGE_ID",
      "bi.FILE_TYPE"
    );
};
export const getOrg = async (req: Request, res: Response) => {
  try {
    const query = await BookOrgs.find({}, { code: 0 });
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const getOrgIn = async (req: Request, res: Response) => {
  try {
    const query = await BookOrgIns.find({ isActive: true }, { isActive: 0 });
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const getBookType = async (req: Request, res: Response) => {
  try {
    const query = await BookTypes.find();
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const getUrgent = async (req: Request, res: Response) => {
  try {
    const query = await BookUrgents.find();
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const addFileBooks = async (req: Request, res: Response) => {
  try {
    const { num } = req.params;
    const storage = multer.diskStorage({
      destination: function (req: Request, file, callback) {
        callback(null, `${DOCUMENT_BOOKIN_PATH}`);
      },
      filename: function (req: Request, file, callback) {
        // const ext = file.mimetype.split("/").filter(Boolean).slice(1).join("/");
        // callback(null, `${num}.${ext}`);
        callback(null, `${num}.${file.fieldname}`);
      },
    });
    var upload = multer({ storage: storage }).single("pdf");

    upload(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.json({ status: 500, results: err.message });
      } else {
        return res.json({
          status: 200,
          results: {
            file: {
              name: num,
              type: req.file?.fieldname,
              size: req.file?.size,
            },
          },
        });
      }
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
export const addBooks = async (req: Request, res: Response) => {
  try {
    const { num } = req.params;
    const { data } = req.body;
    const query = await BookIns.create({ ...data, num_in: num });
    return res.json({ status: 200, results: query._id });
  } catch (error: any) {
    console.log(error.message);
    return res.json({ status: 500, results: error.message });
  }
};
export const UpdateBooks = async (req: Request, res: Response) => {
  try {
    const { idBook } = req.params;
    const { data } = req.body;
    const findBook = await BookIns.findOneAndUpdate(
      { _id: idBook },
      { ...data }
    );

    return res.json({ status: 200, results: findBook });
  } catch (error: any) {
    console.log(error.message);
    return res.json({ status: 500, results: error.message });
  }
};
export const getBooksSendToSign = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const query = await BookIns.findById("");
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    console.log(error.message);
    return res.json({ status: 500, results: error.message });
  }
};
export const convertBookToNoSql = async (req: Request, res: Response) => {
  const { num } = req.params;
  try {
    const query = await dbOffice.raw(`SELECT 
    b.BOOK_NUM_IN as num_in,
    b.BOOK_YEAR_ID as year_main,
    b.BOOK_TYPE_ID as 'type_id',
    bt.BOOK_TYPE_NAME as 'type_name',
    b.BOOK_NUMBER as num_text,
    bu.URGENT_ID as 'urgent_id',
    bu.URGENT_NAME as 'urgent_name',
    b.BOOK_DATE as 'date_time_rec',
    b.BOOK_NAME as 'title',
    b.BOOK_DETAIL as 'detail',
    bo.BOOK_ORG_ID as 'form_org_id',
    bo.BOOK_ORG_NAME as 'form_org_name',
    b.BOOK_ORG_TO_ID as 'to_org_id',
    b.BOOK_ORG_TO_NAME as 'to_org_name',
    b.DATE_TIME_SAVE as 'createAt',
    b.DATE_TIME_UPDATE as 'updateAt'
  FROM book_index b 
  LEFT JOIN book_urgent bu ON bu.URGENT_ID = b.ID
  LEFT JOIN book_type bt ON bt.BOOK_TYPE_ID = b.BOOK_TYPE_ID
  LEFT JOIN book_org bo ON bo.BOOK_ORG_ID = b.BOOK_ORG_ID
  LEFT JOIN book_org_in boi ON boi.BOOK_ORG_ID = boi.BOOK_ORG_ID
  
  ORDER BY b.BOOK_DATE DESC
  
  `);
    const bType = await BookTypes.find();
    const books = query[0];
    const mapBooks = books.map((item: any, index: number) => {
      return {
        num_in: item.num_in,
        year_main: item.year_main,
        type: {
          _id: bType.filter((i: any) => i.name === item.type_name)[0]._id,
          name: item.type_name || "",
        },
        num_text: item.num_text,
        urgent: {
          _id: item.urgent_id || "",
          name: item.urgent_name || "",
        },
        date_time_rec: item.date_time_rec,
        title: item.title,
        detail: item.detail,
        form_org: {
          _id: item.form_org_id || "",
          name: item.form_org_name || "",
        },
        to_org: {
          _id: item.to_org_id || "",
          name: item.to_org_name || "",
        },
        createAt: item.createAt,
        updateAt: item.updateAt || moment().format("YYYY-MM-DD HH:MM:ss"),
      };
    });
    // const jsonData = JSON.stringify(mapBooks, null, 2);
    // fs.writeFile("data.json", jsonData, "utf8", (err) => {
    //   if (err) {
    //     console.error("Error writing JSON file:", err);
    //     return;
    //   }
    //   console.log("JSON file has been saved.");
    // });
    return res.json({ status: 200, resulte: mapBooks });
  } catch (error: any) {
    console.log("error");
    console.log(error.message);
    return res.json({ status: 500, resulte: error.message });
  }
};
export const getMaxBook = async (req: Request, res: Response) => {
  try {
    const query = await BookIns.aggregate([
      { $group: { _id: null, maxField: { $max: "$num_in" } } },
    ]);
    // return res.json({ status: 200, results: query});
    if (query.length == 0) {
      return res.json({ status: 200, results: 1 });
    } else {
      if (query[0].maxField) {
        return res.json({ status: 200, results: query[0].maxField + 1 });
      } else {
        return res.json({ status: 200, results: 1 });
      }
    }
  } catch (error: any) {
    res.json({ status: 500, results: error.message });
    console.log("error");
    console.log(error.message);
  }
};
export const changeLeader = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    await Leader.deleteMany({});
    const query = await Leader.create(data);
    res.json({ status: 200, results: data });
  } catch (error: any) {
    res.json({ status: 500, results: error.message });
    console.log("error");
    console.log(error.message);
  }
};
