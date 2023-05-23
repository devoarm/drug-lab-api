import express, { Request, Response } from "express";
import dbOffice from "../../config/dbOffice";
const saltRounds = 10;

require("dotenv").config();

const secret = process.env.SECRET_KEY;

export const SearchFullnamePerson = async (req: Request, res: Response) => {
  const { fullname, authId, book_id } = req.query;

  try {
    if (fullname === "") {
      const findName = await dbOffice
        .queryBuilder()
        .fromRaw(
          `(SELECT hp.ID as hr_id, hp.HR_FNAME, hp.HR_LNAME,CONCAT(hp.HR_FNAME," ",hp.HR_LNAME) as fullname FROM hr_person as hp WHERE hp.ID != ${authId}) as ss`
        )

        .whereIn("ss.hr_id", [6, 3088])
        .select(
          "ss.*",
          dbOffice.raw(
            `CASE WHEN (select count(*) as count from book_send_person bp2 where bp2.SEND_BY_ID=${authId} and bp2.HR_PERSON_ID=ss.hr_id and bp2.BOOK_ID = ${book_id}) > 0 THEN 'send' ELSE 'unsend' END as status_send`
          )
        )
        .limit(5);
      return res.json({ status: 200, results: findName });
    } else {
      const findName = await dbOffice
        .queryBuilder()
        .fromRaw(
          `(SELECT hp.ID as hr_id, hp.HR_FNAME, hp.HR_LNAME,CONCAT(hp.HR_FNAME," ",hp.HR_LNAME) as fullname FROM hr_person as hp WHERE hp.ID != ${authId}) as ss`
        )
        .whereILike("ss.fullname", `%${fullname}%`)
        .select(
          "ss.*",
          dbOffice.raw(
            `CASE WHEN (select count(*) as count from book_send_person bp2 where bp2.SEND_BY_ID=${authId} and bp2.HR_PERSON_ID=ss.hr_id and bp2.BOOK_ID = ${book_id}) > 0 THEN 'send' ELSE 'unsend' END as status_send`
          )
        )
        .limit(5);

      return res.json({ status: 200, results: findName });
    }
  } catch (error: any) {
    return res.json({ status: 500, err: error.message });
  }
};


