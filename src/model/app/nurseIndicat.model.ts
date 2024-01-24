import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    titleId: { type: "ObjectId", required: true },
    subTitleId: { type: "ObjectId", required: true },
    onDutyId: { type: "ObjectId", required: true },
    fromDate: { type: Date, required: true },
    value: { type: Number },
    person_save: { type: String },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const nurseIndicat = model("nurse_indicat", schema);
export default nurseIndicat;
