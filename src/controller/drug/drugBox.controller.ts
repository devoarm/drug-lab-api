import express, { Request, Response } from "express";
import dbApp from "../../config/dbApp";
import moment from "moment";
import dbHos from "../../config/dbHos";
import dbOffice from "../../config/dbOffice";
import drugBoxItems from "../../model/app/drugBoxItems.model";
import DrugBoxs from "../../model/app/drugBox.model";
import DrugBoxWards from "../../model/app/drugBoxWard.model";
import DrugBoxSpecified from "../../model/app/drugBoxSpecified.model";
import dbAppMong from "../../config/dbAppMong";
const saltRounds = 10;

require("dotenv").config();

const secret = process.env.SECRET_KEY;

export const getDrugBoxItem = async (req: Request, res: Response) => {
  try {
    const query: any = await drugBoxItems.find();
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const getDashboardDrugBox = async (req: Request, res: Response) => {
  try {
    const query: any = await DrugBoxs.find(
      {}, // Query criteria, you can specify additional conditions here
      { drug_box_service: { $slice: 1 } } // Projection with $slice operator
    );
    // const mData = query.map((item: any, index: number) => {
    //   return {
    //     id: item._id,
    //     drug_box_name: item.drug_box_name,
    //     current_send_person: item.drug_box_service[0]?.current_send_person!,
    //     current_receive_person: item.drug_box_service[0]?.current_receive_person!,
    //     current_prepare_person: item.drug_box_service[0]?.current_prepare_person!,
    //     current_ward: item.drug_box_service[0]?.current_ward!,
    //     drug_exp: item.drug_box_service[0]?.drug_exp?.name,
    //     exp_date: item.drug_box_service[0]?.exp_date!
    //   }
    // })
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
    // const query: any = await dbApp("drug_box").select("*");
    // query.date_time = moment(query.date_time).format("DD-MM-YYYY HH:MM:SS");
    const query = await DrugBoxs.find({}, { drug_box_service: 0 });
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
  const { _id } = req.query;
  const { data } = req.body;
  try {
    const findNew: any = await DrugBoxs.findOne(
      { _id: _id },
      { drug_box_service: { $slice: 1 } }
    );

    if (
      findNew.drug_box_service.length > 0 &&
      findNew.drug_box_service[0].status == "receive"
    ) {
      return res.json({
        status: 301,
        results: findNew,
        msg: "กรุณาจัดกล่องก่อน",
      });
    } else if (
      findNew.drug_box_service.length > 0 &&
      findNew.drug_box_service[0].status == "send"
    ) {
      return res.json({
        status: 301,
        results: findNew,
        msg: "กล่องนี้ได้ส่งไปแล้ว",
      });
    } else {
      const ser = findNew.drug_box_service[0];
      const dataFinal = {
        drug_exp: ser.drug_exp,
        current_prepare_person: ser.current_prepare_person,
        exp_date: ser.exp_date,
        ...data,
        status: "send",
        date_time: moment(),
      };
      // console.log(dataFinal)
      // return res.json({ status: 200, msg: dataFinal });
      const query = await DrugBoxs.updateOne(
        { _id: _id },
        {
          $push: {
            drug_box_service: {
              $each: [dataFinal],
              $position: 0,
            },
          },
        }
      );
      return res.json({ status: 200, results: query, msg: dataFinal });
    }
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const receiveBox = async (req: Request, res: Response) => {
  const { _id } = req.query;
  const { data } = req.body;

  try {
    const findNew: any = await DrugBoxs.findOne(
      { _id: _id },
      { drug_box_service: { $slice: 1 } }
    );

    if (
      findNew.drug_box_service.length > 0 &&
      findNew.drug_box_service[0].status == "receive"
    ) {
      return res.json({
        status: 301,
        results: findNew,
        msg: "กล่องนี้กดรับไปแล้ว",
      });
    } else if (
      findNew.drug_box_service.length > 0 &&
      findNew.drug_box_service[0].status == "prepare"
    ) {
      return res.json({
        status: 301,
        results: findNew,
        msg: "กรุณาส่งกล่องก่อน",
      });
    } else if (
      findNew.drug_box_service.length > 0 &&
      findNew.drug_box_service[0].status == "send"
    ) {
      const dataFinal = {
        ...data,
        drug_exp: findNew.drug_box_service[0].drug_exp,
        current_send_person: findNew.drug_box_service[0].current_send_person,
        current_receive_person:
          findNew.drug_box_service[0].current_receive_person,
        current_prepare_person:
          findNew.drug_box_service[0].current_prepare_person,
        current_ward: findNew.drug_box_service[0].current_ward,
        exp_date: findNew.drug_box_service[0].exp_date,
        date_time: moment(),
        status: "receive",
      };

      const query = await DrugBoxs.updateOne(
        { _id: _id },
        {
          $push: {
            drug_box_service: {
              $each: [dataFinal],
              $position: 0,
            },
          },
        }
      );
      return res.json({ status: 200, results: query, msg: dataFinal });
    } else {
      return res.json({
        status: 301,
        results: findNew,
        msg: "กรุณาจัดกล่องก่อน",
      });
    }
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const prepareBox = async (req: Request, res: Response) => {
  const { _id } = req.query;
  const { data } = req.body;
  const finalData = {
    ...data,
    status: "prepare",
  };
  try {
    const findNew: any = await DrugBoxs.findOne(
      { _id: _id },
      { drug_box_service: { $slice: 1 } }
    );
    // return res.json({
    //   status: 301,
    //   results: findNew,
    //   msg: "กรุณารับกล่องก่อน",
    // });
    if (
      findNew.drug_box_service.length > 0 &&
      findNew.drug_box_service[0].status == "prepare"
    ) {
      return res.json({
        status: 301,
        results: findNew,
        msg: "คุณจัดกล่องไปแล้ว",
      });
    } else if (
      findNew.drug_box_service.length > 0 &&
      findNew.drug_box_service[0].status == "send"
    ) {
      return res.json({
        status: 301,
        results: findNew,
        msg: "กรุณารับกล่องก่อน",
      });
    } else {
      const query = await DrugBoxs.updateOne(
        { _id: _id },
        {
          $push: {
            drug_box_service: {
              $each: [finalData],
              $position: 0,
            },
          },
        }
      );
      return res.json({ status: 200, results: query });
    }
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const getSpecified = async (req: Request, res: Response) => {
  try {
    const query = await DrugBoxSpecified.find();
    return res.json({ status: 200, results: query });
  } catch (error: any) {
    return res.json({ status: 500, results: error.message });
  }
};
export const getWard = async (req: Request, res: Response) => {
  try {
    const query = await DrugBoxWards.find();
    return res.json({ status: 200, results: query });
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
