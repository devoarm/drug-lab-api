import { Schema, model } from "mongoose";

const schema = new Schema({
  text: { type: String, required: true },
});

const DrugBoxSpecified = model("drug_box_specified", schema);
export default DrugBoxSpecified;
