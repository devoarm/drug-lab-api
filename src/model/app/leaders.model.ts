import { Schema, model } from "mongoose";

const schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
});

const Leader = model("leaders", schema);
export default Leader;
