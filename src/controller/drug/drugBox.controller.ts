import express, { Request, Response } from "express";
import dbApp from "../../config/dbApp";
import moment from "moment";
import dbHos from "../../config/dbHos";
import dbOffice from "../../config/dbOffice";
const saltRounds = 10;

require("dotenv").config();

const secret = process.env.SECRET_KEY;

export const getDashboardDrugBox = async (req: Request, res: Response) => {
  try {
    const query: any = await dbApp('drug_box').select('*','drug_box_id as id')

    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const getServiceDrug = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const checkNameSend = await dbApp("drug_person as p").where(
      "p.person_fullname",
      data.senderName
    );
    if (checkNameSend.length < 1) {
      let query = await dbApp("drug_person").insert({
        person_fullname: data.senderName,
      });
    }
    const checkNameReceive = await dbApp("drug_person as p").where(
      "p.person_fullname",
      data.recipientName
    );
    if (checkNameReceive.length < 1) {
      let query = await dbApp("drug_person").insert({
        person_fullname: data.recipientName,
      });
    }

    const currentDrug = await dbApp("drug_box")
      .where("drug_box_id", data.boxNumber)
      .update({
        drug_box_status: data.serviceType,
        current_send_person: data.senderName,
        current_receive_person: data.recipientName,
        date_time: moment().format("YYYY-MM-DD HH:mm:ss"),
      });

    const query = await dbApp("drug_service_box").insert({
      drug_box_id: data.boxNumber,
      sender_name: data.senderName,
      recipient_name: data.recipientName,
      service_type: data.serviceType,
      service_date_time: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
    return res.status(200).json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, err: error.message });
  }
};
export const getDrugBox = async (req: Request, res: Response) => {
  try {
    const query: any = await dbApp("drug_box").select("*");
    query.date_time = moment(query.date_time).format("DD-MM-YYYY HH:MM:SS");
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const getPerson = async (req: Request, res: Response) => {
  try {
    // const query = await dbApp("drug_person")
    //   .select("*")
    //   .orderBy("person_fullname");
    const query =
      await dbOffice.raw(`SELECT CONCAT(pf.HR_PREFIX_NAME,hp.HR_FNAME," ",hp.HR_LNAME) AS fullname,hp.ID as id FROM hr_person hp
    LEFT JOIN hr_prefix pf ON hp.HR_PREFIX_ID = pf.HR_PREFIX_ID`);

    return res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const sendBox = async (req: Request, res: Response) => {
  const { data } = req.body;
  try {
    const currentDrug = await dbApp("drug_box")
      .where("drug_box_id", data.box.drug_box_id)
      .update({
        drug_box_status: data.serviceType,
        current_send_person: data.current_send_person,
        current_receive_person: data.boxIn.fullname,
        current_ward: data.ward.department,
        date_time: moment().format("YYYY-MM-DD HH:mm:ss"),
      });

    const query = await dbApp("drug_service_box").insert({
      drug_box_id: data.box.drug_box_id,
      sender_name: data.current_send_person,
      recipient_name: data.boxIn.fullname,
      ward_name: data.ward.department,
      service_type: data.serviceType,
      service_date_time: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const receiveBox = async (req: Request, res: Response) => {
  const { data } = req.body;
  try {
    const currentDrug = await dbApp("drug_box")
      .where("drug_box_id", data.box.drug_box_id)
      .update({
        drug_box_status: "receive",
        current_receive_person: data.boxIn.fullname,
        current_ward: data.ward.department,
        date_time: moment().format("YYYY-MM-DD HH:mm:ss"),
      });

    const query = await dbApp("drug_service_box").insert({
      drug_box_id: data.box.drug_box_id,
      recipient_name: data.boxIn.fullname,
      ward_name: data.ward.department,
      service_type: "receive",
      service_date_time: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const prepareBox = async (req: Request, res: Response) => {
  const { data } = req.body;
  try {
    const currentDrug = await dbApp("drug_box")
      .where("drug_box_id", data.box.drug_box_id)
      .update({
        drug_box_status: "prepare",
        current_send_person: "",
        current_receive_person: "",
        current_prepare_person: data.current_prepare_person,
        current_ward: "",
        date_time: moment().format("YYYY-MM-DD HH:mm:ss"),
      });

    const query = await dbApp("drug_service_box").insert({
      drug_box_id: data.box.drug_box_id,      
      prepare_name: data.current_prepare_person,
      service_type: "prepare",
      service_date_time: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const getWard = async (req: Request, res: Response) => {
  var sql = `SELECT k.depcode,k.department FROM kskdepartment k`;

  try {
    const query = await dbHos.raw(sql);
    return res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const addBox = async (req: Request, res: Response) => {
  try {
    const checkText = await dbApp("drug_box").where(
      "drug_box_name",
      req.body.drug_box_name
    );
    if (checkText.length > 0) {
      return res.json({ status: 301, results: "same name" });
    }
    const query = await dbApp("drug_box").insert({
      drug_box_name: req.body.drug_box_name,
    });
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const addDrug = async (req: Request, res: Response) => {
  try {
    const checkText = await dbApp("drug").where(
      "drug_name",
      req.body.drug_name
    );
    if (checkText.length > 0) {
      return res.json({ status: 301, results: "same name" });
    }
    const query = await dbApp("drug").insert({
      drug_name: req.body.drug_name,
    });
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const getDrug = async (req: Request, res: Response) => {
  try {
    const query = await dbApp("drug").select("*");

    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
