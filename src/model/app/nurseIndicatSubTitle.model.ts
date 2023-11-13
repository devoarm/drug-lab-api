import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    subTitle: { type: String, required: true },
    template: { type: String },
  },
  {
    timestamps: true,
  }
);

const nurseIndicatSubTitles = model("nurse_Indicat_sub_titles", schema);
export default nurseIndicatSubTitles;
