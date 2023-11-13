import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    text: { type: String, required: true },
    time_start: { type: String },
    time_end: { type: String },
  },
  {
    timestamps: true,
  }
);

const onDutys = model("on_dutys", schema);
export default onDutys;
