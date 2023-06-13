import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    fullname: {
      type: "String",
      required: true,
    },
    hn: {
      type: "String",
      required: true,
    },
    cid: {
      type: "String",
      required: true,
    },
    visit: [
      {
        opitemrece: [
          {
            drug_name: {
              type: "String",
            },
            units: {
              type: "String",
            },
            strength: {
              type: "String",
            },
            unitprice: {
              type: "Number",
            },
            id: {
              type: "String",
            },
            icode: {
              type: "String",
            },
            qty: {
              type: "Number",
            },
            drugusage: {
              type: "String",
            },
            vstdate: {
              type: "Date",
            },
            vsttime: {
              type: "String",
            },
            rxtime: {
              type: "String",
            },
            hcode: {
              type: "String",
            },
            dep_code: {
              type: "String",
            },
            pttype: {
              type: "String",
            },
            staff: {
              type: "String",
            },
            item_no: {
              type: "Number",
            },
            sum_price: {
              type: "Number",
            },
            cost: {
              type: "Number",
            },
            sent: {
              type: "Boolean",
              default: false,
            },
          },
        ],
        vn: {
          type: "String",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Patients = model("patients", schema);
export default Patients;
