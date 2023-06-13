import express, { Request, Response } from "express";
var jwt = require("jsonwebtoken");
require("dotenv").config();
import dbOffice from "../../config/dbOffice";
const secret = process.env.SECRET_KEY;
import multer from "multer";
import moment from "moment";
import BookIns from "../../model/app/bookIns.model";
import BookYear from "../../model/app/bookYear.model";

//start new database
export const BookSendToSign = async (req: Request, res: Response) => {
  const _id = req.params;
  const { data } = req.body;
  try {
    const query = await BookIns.updateOne(
      { _id: _id },
      {
        $push: {
          send_to_sign: {
            $each: [data],
            $position: 0,
          },
        },
      }
    );
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const GetBookYear = async (req: Request, res: Response) => {
  try {
    const query = await BookYear.find({ active: true }, { _id: 1, year: 1 });
    const mapQ = query.map((item: any) => {
      return {
        id: item._id,
        year: item.year,
      };
    });
    return res.json({ status: 200, results: mapQ });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const AddBookYear = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const query = await BookYear.create(data);
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const BookSendPerson = async (req: Request, res: Response) => {
  const { _id, person_id } = req.query;
  try {
    const query = await BookIns.find({
      _id:_id,
      send_to_sign: {
        $elemMatch: {
          person_id: person_id          
        },
      },
    });

    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};

//end new database

export const BookInsert = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const query = await dbOffice("book_org").limit(1);
    res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const BookOrg = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    // const query = await BookIns.create();
    // res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};

export const BookSendDep = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const query = await dbOffice("hr_department_sub as hrd").where("");
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const BookOnRead = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const query = await dbOffice("book_send_person")
      .where("BOOK_ID", data.book_id)
      .andWhere("HR_PERSON_ID", data.auth_id)
      .update({
        READ_STATUS: "True",
      });
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const BookUpdatePdf = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const storage = multer.diskStorage({
      destination: function (req: Request, file: any, callback: any) {
        callback(null, `${process.env.DOCUMENT_BOOKIN_PATH}`);
      },
      filename: function (req: Request, file: any, callback: any) {
        const ext = file.mimetype.split("/").filter(Boolean).slice(1).join("/");
        callback(null, `${id}.${ext}`);
      },
    });
    var upload = multer({ storage: storage }).array("pdf", 100);
    upload(req, res, function (err: any) {
      if (err) {
        console.log("error");
        console.log(err);
        return res.end("Error uploading file.");
      } else {
        return res.status(200).json({ msg: "ok" });
      }
    });
  } catch (error: any) {
    console.log("error");
    console.log(error.message);
  }
};
export const BookDirector = async (req: Request, res: Response) => {
  try {
    const query = await dbOffice("book_send_person as bs")
      .leftJoin("book_index as bi", "bs.BOOK_ID", "bi.ID")
      .where("bs.HR_PERSON_ID", process.env.LEADER_ID)
      .select(
        "bs.ID as book_send_person_id",
        "bs.BOOK_ID",
        "bs.HR_PERSON_ID",
        "bs.SEND_BY_NAME",
        "bi.BOOK_NAME",
        "bi.BOOK_DETAIL",
        "bi.BOOK_DATE",
        "bi.DATE_TIME_SAVE",
        "bi.BOOK_SECRET_ID"
      )
      .orderBy("BOOK_DATE", "desc");

    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error });
  }
};
export const BookLeaderCount = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const query = await dbOffice("book_index_send_leader as bl")
      .leftJoin("book_index as b", "bl.BOOK_ID", "b.ID")
      .leftJoin("book_index_img as bi", "bi.BOOK_ID", "b.ID")
      .leftJoin("book_urgent as bu", "b.BOOK_URGENT_ID", "bu.URGENT_ID")
      .whereIn("bl.SEND_STATUS", ["SEND", "CHECK", ""])
      .andWhere("bl.SEND_LD_HR_ID", id)
      .orderBy("bl.SEND_LD_DATE_TIME", "desc")
      .count("b.ID as count")
      .first();
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const BookIndexSendLeader = async (req: Request, res: Response) => {
  const { id } = req.params;
  // return console.log(req.params);
  try {
    const query = await dbOffice("book_index_send_leader as bl")
      // .innerJoin(
      //   "book_index_send_leader_secretary as bsl",
      //   "bl.BOOK_ID",
      //   "bsl.BOOK_ID"
      // )
      .leftJoin("book_index as b", "bl.BOOK_ID", "b.ID")
      .leftJoin("book_index_img as bi", "bi.BOOK_ID", "b.ID")
      .leftJoin("book_urgent as bu", "b.BOOK_URGENT_ID", "bu.URGENT_ID")
      .where("bl.SEND_STATUS", "CHECK")
      .andWhere("bl.SEND_LD_HR_ID", id)
      .orderBy([
        { column: "bl.TOP_LEADER_AC_DATE_TIME", order: "desc" },
        { column: "bl.SEND_LD_DATE_TIME", order: "desc" },
      ])
      .select(
        "b.BOOK_NAME",
        "b.BOOK_NUMBER",
        "b.BOOK_DETAIL",
        "b.BOOK_URGENT_ID",
        "bu.URGENT_NAME",
        "bl.*",
        "bi.ID as BOOK_IMAGE_ID",
        "bi.FILE_TYPE"
      );
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const BookIndexLeaderSign = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const query = await dbOffice("book_index_send_leader")
      .where("ID", id)
      .update({
        SEND_STATUS: req.body.SEND_STATUS,
        TOP_LEADER_AC_NAME: req.body.TOP_LEADER_AC_NAME,
        TOP_LEADER_AC_ID: req.body.TOP_LEADER_AC_ID,
        TOP_LEADER_AC_DATE: req.body.TOP_LEADER_AC_DATE,
        TOP_LEADER_AC_DATE_TIME: req.body.TOP_LEADER_AC_DATE_TIME,
        TOP_LEADER_AC_CMD: req.body.TOP_LEADER_AC_CMD,
      });
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const BookIndexPerson = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const query = await dbOffice("book_send_person as bp")
      .leftJoin("book_index as b", "bp.BOOK_ID", "b.ID")
      .leftJoin("book_index_img as bi", "bi.BOOK_ID", "b.ID")
      .leftJoin("book_urgent as bu", "b.BOOK_URGENT_ID", "bu.URGENT_ID")
      .where("bp.HR_PERSON_ID", id)
      .andWhere("bp.READ_STATUS", "False")
      .orderBy("bp.SEND_DATE_TIME", "desc")
      .select(
        "bp.*",
        "b.BOOK_NAME",
        "b.BOOK_NUMBER",
        "b.BOOK_DETAIL",
        "b.BOOK_URGENT_ID",
        "bu.URGENT_NAME",
        "bi.ID as BOOK_IMAGE_ID",
        "bi.FILE_TYPE"
      );
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const BookIndexSendDep = async (req: Request, res: Response) => {
  const { idDep, limit, userId, read } = req.params;
  try {
    const query = await dbOffice.raw(`select 
    ss.* 
  FROM (SELECT 	
      IF(br.READ_HR_FULLNAME!="",'1','0') as status_read,
      sd.*,
      b.DATE_TIME_SAVE,
      b.BOOK_NAME,
      b.BOOK_NUMBER,
      b.BOOK_DETAIL,
      b.BOOK_URGENT_ID,
      bu.URGENT_NAME,
      bi.ID as BOOK_IMAGE_ID,
      bi.FILE_TYPE,				
      ds.HR_DEPARTMENT_ID,
      ds.HR_DEPARTMENT_SUB_NAME
    FROM book_send_dep sd
    LEFT JOIN hr_department_sub ds ON ds.HR_DEPARTMENT_SUB_ID = sd.HR_DEPARTMENT_SUB_ID
    LEFT JOIN book_index b ON sd.BOOK_ID = b.ID
    LEFT JOIN book_index_img bi ON bi.BOOK_ID = b.ID
    LEFT JOIN book_urgent bu ON bu.URGENT_ID = b.BOOK_URGENT_ID
    LEFT JOIN book_read br ON br.BOOK_ID = b.ID AND br.READ_HR_ID = '${userId}'
    
    WHERE 
      sd.BOOK_ID != '' AND b.BOOK_NAME IS NOT NULL AND ds.HR_DEPARTMENT_SUB_ID = '${idDep} AND b.BOOK_NAME != ""'
    ORDER BY b.DATE_TIME_SAVE DESC
    ) ss
    
    WHERE ss.status_read = '${read}'
    LIMIT ${limit}
  `);
    return res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const BookIndexSendGroup = async (req: Request, res: Response) => {
  const { idDep, userId, limit, read } = req.params;
  try {
    const query = await dbOffice.raw(`select 
    ss.* 
  FROM (
		SELECT 
			IF(br.READ_HR_FULLNAME!="",'1','0') as status_read,
			bs.*,
			b.DATE_TIME_SAVE,
			b.BOOK_NAME,
			b.BOOK_NUMBER,
			b.BOOK_DETAIL,
			b.BOOK_URGENT_ID,
			bu.URGENT_NAME,
			bi.ID as BOOK_IMAGE_ID,
			bi.FILE_TYPE,				
			d.HR_DEPARTMENT_NAME

	FROM book_send bs

	LEFT JOIN hr_department d ON d.HR_DEPARTMENT_ID = bs.HR_DEPARTMENT_ID
	LEFT JOIN book_index b ON bs.BOOK_ID = b.ID
	LEFT JOIN book_index_img bi ON bi.BOOK_ID = b.ID
	LEFT JOIN book_urgent bu ON bu.URGENT_ID = b.BOOK_URGENT_ID
	LEFT JOIN book_read br ON br.BOOK_ID = b.ID AND br.READ_HR_ID = '${userId}'

	WHERE bs.HR_DEPARTMENT_ID = '${idDep}' AND b.BOOK_NAME != ''
	ORDER BY b.DATE_SAVE DESC
	) ss
  WHERE ss.status_read = '${read}'
  LIMIT ${limit}
`);
    return res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const BookIndexCountDep = async (req: Request, res: Response) => {
  const { idDep, userId, read } = req.params;
  try {
    const query = await dbOffice.raw(`select 
    COUNT(ss.BOOK_ID) as count
  FROM (SELECT 	
      IF(br.READ_HR_FULLNAME!="",'1','0') as status_read,
      sd.*,			
      b.DATE_TIME_SAVE,
			b.BOOK_NAME,
      b.BOOK_NUMBER,
      b.BOOK_DETAIL,
      b.BOOK_URGENT_ID,
      bu.URGENT_NAME,			
      bi.ID as BOOK_IMAGE_ID,
      bi.FILE_TYPE,				
      ds.HR_DEPARTMENT_ID,
      ds.HR_DEPARTMENT_SUB_NAME
    FROM book_send_dep sd
    LEFT JOIN hr_department_sub ds ON ds.HR_DEPARTMENT_SUB_ID = sd.HR_DEPARTMENT_SUB_ID
    LEFT JOIN book_index b ON sd.BOOK_ID = b.ID
    LEFT JOIN book_index_img bi ON bi.BOOK_ID = b.ID
    LEFT JOIN book_urgent bu ON bu.URGENT_ID = b.BOOK_URGENT_ID
    LEFT JOIN book_read br ON br.BOOK_ID = b.ID AND br.READ_HR_ID = '${userId}'
    
    WHERE 
      sd.BOOK_ID != '' AND b.BOOK_NAME IS NOT NULL AND ds.HR_DEPARTMENT_SUB_ID = '${idDep} AND b.BOOK_NAME != '''
    ORDER BY b.DATE_TIME_SAVE DESC
   ) ss
    
    WHERE ss.status_read = '${read}'`);
    return res.json({ status: 200, results: query[0][0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const BookIndexCountGroup = async (req: Request, res: Response) => {
  const { idDep, userId, read } = req.params;
  try {
    const query = await dbOffice.raw(`select 
    COUNT(ss.BOOK_ID) as count
  FROM (
		SELECT 
			IF(br.READ_HR_FULLNAME!="",'1','0') as status_read,
			bs.*,
			b.DATE_TIME_SAVE,
			b.BOOK_NAME,
			b.BOOK_NUMBER,
			b.BOOK_DETAIL,
			b.BOOK_URGENT_ID,
			bu.URGENT_NAME,
			bi.ID as BOOK_IMAGE_ID,
			bi.FILE_TYPE,				
			d.HR_DEPARTMENT_NAME

	FROM book_send bs

	LEFT JOIN hr_department d ON d.HR_DEPARTMENT_ID = bs.HR_DEPARTMENT_ID
	LEFT JOIN book_index b ON bs.BOOK_ID = b.ID
	LEFT JOIN book_index_img bi ON bi.BOOK_ID = b.ID
	LEFT JOIN book_urgent bu ON bu.URGENT_ID = b.BOOK_URGENT_ID
	LEFT JOIN book_read br ON br.BOOK_ID = b.ID AND br.READ_HR_ID = '${userId}'

	WHERE bs.HR_DEPARTMENT_ID = '${idDep} AND b.BOOK_NAME != '''
	) ss

WHERE ss.status_read = '${read}'
`);
    return res.json({ status: 200, results: query[0][0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const BookIndexLeaderDecide = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    const query = await dbOffice("book_index_send_leader as bl")
      .where("bl.ID", bookId)
      .select("*");
    return res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const BookHistoryPerson = async (req: Request, res: Response) => {
  const { authId, dateStart, dateEnd } = req.query;

  try {
    const query = await dbOffice("book_send_person as bp")
      .leftJoin("book_index as b", "bp.BOOK_ID", "b.ID")
      .leftJoin("book_index_img as bi", "bi.BOOK_ID", "b.ID")
      .leftJoin("book_urgent as bu", "b.BOOK_URGENT_ID", "bu.URGENT_ID")
      .where("bp.HR_PERSON_ID", authId)
      .where((e: any) => {
        e.orWhereIn("bp.SEND_DATE_TIME", [dateStart, dateEnd]);
        e.orWhereBetween("bp.SEND_DATE_TIME", [dateStart, dateEnd]);
      })
      .andWhere("bp.READ_STATUS", "True")
      .orderBy("bp.SEND_DATE_TIME", "desc")
      .select(
        "bp.*",
        "b.BOOK_NAME",
        "b.BOOK_DETAIL",
        "b.BOOK_URGENT_ID",
        "bu.URGENT_NAME",
        "bi.ID as BOOK_IMAGE_ID",
        "bi.FILE_TYPE"
      );
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const BookHistoryLeader = async (req: Request, res: Response) => {
  const { authId, dateStart, dateEnd } = req.query;

  try {
    const query = await dbOffice("book_index_send_leader as bl")
      .leftJoin("book_index as b", "bl.BOOK_ID", "b.ID")
      .leftJoin("book_index_img as bi", "bi.BOOK_ID", "b.ID")
      .leftJoin("book_urgent as bu", "b.BOOK_URGENT_ID", "bu.URGENT_ID")
      .where((e: any) => {
        e.orWhereIn("bl.TOP_LEADER_AC_DATE", [dateStart, dateEnd]);
        e.orWhereBetween("bl.TOP_LEADER_AC_DATE", [dateStart, dateEnd]);
      })
      .andWhere("bl.SEND_LD_HR_ID", authId)
      .whereIn("bl.SEND_STATUS", ["YES", "NO"])
      .orderBy([
        { column: "bl.TOP_LEADER_AC_DATE_TIME", order: "desc" },
        // { column: "bl.SEND_LD_DATE_TIME", order: "desc" },
      ])
      .select(
        "b.BOOK_NAME",
        "b.BOOK_NUMBER",
        "b.BOOK_DETAIL",
        "b.BOOK_URGENT_ID",
        "bu.URGENT_NAME",
        "bl.*",
        "bi.ID as BOOK_IMAGE_ID",
        "bi.FILE_TYPE"
      );

    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const BookSendToSecretary = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const checkSended = await dbOffice("book_index_send_leader").where({
      BOOK_ID: data.BOOK_ID,
      SEND_LD_HR_ID: data.SEND_LD_HR_ID,
      SEND_LD_BY_HR_ID: data.SEND_LD_BY_HR_ID,
    });
    if (checkSended.length > 0) {
      return res.json({ status: 301, results: checkSended });
    } else {
      const query = await dbOffice("book_index_send_leader").insert({
        BOOK_ID: data.BOOK_ID,
        SEND_LD_HR_ID: data.SEND_LD_HR_ID,
        SEND_LD_HR_NAME: data.SEND_LD_HR_NAME,
        SEND_LD_BY_HR_ID: data.SEND_LD_BY_HR_ID,
        SEND_LD_BY_HR_NAME: data.SEND_LD_BY_HR_NAME,
        SEND_LD_DETAIL: data.SEND_LD_DETAIL,
        SEND_LD_DATE: data.SEND_LD_DATE,
        SEND_LD_DATE_TIME: data.SEND_LD_DATE_TIME,
        SEND_STATUS: data.SEND_STATUS,
      });
      return res.json({ status: 200, results: query });
    }
  } catch (error: any) {
    return res.json({ status: 500, results: error });
  }
};
export const BookGetSecretary = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const checkSended = await dbOffice("book_index_send_leader").where({
      BOOK_ID: data.BOOK_ID,
      SEND_LD_HR_ID: data.SEND_LD_HR_ID,
      SEND_LD_BY_HR_ID: data.SEND_LD_BY_HR_ID,
    });
    if (checkSended.length > 0) {
      return res.json({ status: 301, results: checkSended });
    } else {
      const query = await dbOffice("book_index_send_leader").insert({
        BOOK_ID: data.BOOK_ID,
        SEND_LD_HR_ID: data.SEND_LD_HR_ID,
        SEND_LD_HR_NAME: data.SEND_LD_HR_NAME,
        SEND_LD_BY_HR_ID: data.SEND_LD_BY_HR_ID,
        SEND_LD_BY_HR_NAME: data.SEND_LD_BY_HR_NAME,
        SEND_LD_DETAIL: data.SEND_LD_DETAIL,
        SEND_LD_DATE: data.SEND_LD_DATE,
        SEND_LD_DATE_TIME: data.SEND_LD_DATE_TIME,
        SEND_STATUS: data.SEND_STATUS,
      });
      return res.json({ status: 200, results: query });
    }
  } catch (error: any) {
    return res.json({ status: 500, results: error });
  }
};
export const BookReading = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const qCheck = await dbOffice("book_read")
      .where("READ_HR_ID", data.READ_HR_ID)
      .where("BOOK_ID", data.BOOK_ID);
    if (qCheck.length == 0) {
      const queue = await dbOffice("book_read").insert({
        BOOK_ID: data.BOOK_ID,
        READ_HR_ID: data.READ_HR_ID,
        DATE_TIME_READ: moment().format("YYYY-MM-DD HH:MM:ss"),
        READ_HR_FULLNAME: data.READ_HR_FULLNAME,
      });
      return res.json({ status: 200, results: queue });
    }
    return res.json({ status: 200, results: [] });
  } catch (error: any) {
    return res.json({ status: 500, results: error });
  }
};
export const BookReadAllGroup = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    // const query = await dbOffice("book_read").insert({ ...data });
    const query = await dbOffice.raw(`
    select 
      ss.*
    FROM (
		  SELECT 
        IF(br.READ_HR_FULLNAME!="",'1','0') as status_read,
        bs.*
	    FROM book_send bs

      LEFT JOIN hr_department d ON d.HR_DEPARTMENT_ID = bs.HR_DEPARTMENT_ID
      LEFT JOIN book_index b ON bs.BOOK_ID = b.ID     
      LEFT JOIN book_read br ON br.BOOK_ID = b.ID AND br.READ_HR_ID = '${data.userId}'
      WHERE bs.HR_DEPARTMENT_ID = '${data.depId}'
    ) ss

    WHERE ss.status_read = '0'`);
    const mapQ = query[0].map((item: any) => {
      return {
        BOOK_ID: item.BOOK_ID,
        READ_HR_ID: data.userId,
        DATE_TIME_READ: moment().format("YYYY-MM-DD HH:MM:ss"),
        READ_HR_FULLNAME: data.fullname,
      };
    });
    const addQ = await dbOffice("book_read").insert(mapQ);
    return res.json({ status: 200, results: addQ });
  } catch (error: any) {
    return res.json({ status: 500, results: error });
  }
};
