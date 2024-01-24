import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    subTitle: { type: String, required: true },
    titleId: { type: "ObjectId", required: true },
    template: { type: String },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const nurseIndicatSubTitles = model("nurse_indicat_sub_titles", schema);
export default nurseIndicatSubTitles;
