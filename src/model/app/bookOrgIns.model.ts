import { Schema, model } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
  isActive: { type: Boolean },
});

const BookOrgIns = model("book_org_ins", schema);
export default BookOrgIns;
