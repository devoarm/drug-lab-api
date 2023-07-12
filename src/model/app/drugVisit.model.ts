import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    hn: {
      type: "String",
      required: true,
    },
    vn: {
      type: "String",
      required: true,
    },
    fullname: {
      type: "String",
    },
    cid: {
      type: "String",
    },
    vstdate: {
      type: "String",
    },
    isContact:{
      type: Boolean,
      default: false
    },
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
        index: {
          type: "Number",
        },
        stale: {
          type: "Number",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const DrugVisits = model("drug_visits", schema);
export default DrugVisits;
