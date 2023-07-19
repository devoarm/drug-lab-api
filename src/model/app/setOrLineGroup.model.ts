import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    nameGroup: { type: String, required: true },
    token: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const SetOrLineGroup = model("set_or_line_groups", schema);
export default SetOrLineGroup;
