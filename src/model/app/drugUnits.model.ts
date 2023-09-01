import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: "ObjectId" },
  text: { type: String },
});

const DrugUnits = model("drug_units", schema);
export default DrugUnits;
