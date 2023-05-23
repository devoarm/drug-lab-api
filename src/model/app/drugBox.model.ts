import { Schema, model } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
  drug_box_name: { type: String, require: true },
  drug_box_service: [
    {
      current_send_person: { type: String },
      current_receive_person: { type: String },
      current_prepare_person: { type: String },
      current_ward: { type: String },
      specified: {
        _id: {
          type: "ObjectId",
        },
        text: {
          type: "String",
        },
      },
      drug_exp: {
        _id: {
          type: "ObjectId",
        },
        name: {
          type: "String",
        },
      },
      use_drug_item: [
        {
          _id: {
            type: "ObjectId",
          },
          name: {
            type: "String",
          },
          count:{
            type: Number
          }
        },
      ],
      status: { type: String, required: true },
      date_time: { type: Date },
      exp_date: { type: Date },
    },
  ],
});

const DrugBoxs = model("drug_boxs", schema);
export default DrugBoxs;
