import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    title: { type: String, required: true },
    template: { type: String },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const nurseIndicatTitles = model("nurse_indicat_titles", schema);
export default nurseIndicatTitles;
