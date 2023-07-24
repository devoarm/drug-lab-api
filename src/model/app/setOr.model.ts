import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    hn: { type: String, required: true },
    body_weight: { type: Number, required: true },
    from_ward: {
      depcode: { type: String, required: true },
      department: { type: String, required: true },
    },
    fullname: { type: String, required: true },
    age: { type: String, required: true },
    disea_cong: { type: String },
    diag: { type: String, required: true },
    surgery: { type: String, required: true },
    date_time_surgery: { type: Date, required: true },
    doctor: {
      code: { type: String, required: true },
      name: { type: String, required: true },
    },
    person_save: {
      id: { type: String },
      fullname: { type: String },
    },
    status: { type: String },
    urgency: { type: String },
    anes: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const SetOr = model("set_ors", schema);
export default SetOr;
