import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    title: { type: String, required: true },
    template: { type: String },
  },
  {
    timestamps: true,
  }
);

const nurseIndicatTitles = model("nurse_Indicat_titles", schema);
export default nurseIndicatTitles;
