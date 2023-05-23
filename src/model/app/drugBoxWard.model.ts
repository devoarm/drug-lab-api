import { Schema, model } from "mongoose";

const schema = new Schema({
  department: { type: String, required: true },
});

const DrugBoxWards = model("drug_box_wards", schema);
export default DrugBoxWards;
