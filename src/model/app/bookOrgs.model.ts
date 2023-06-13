import { Schema, model } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
  code: { type: String },
});

const BookOrgs = model("book_orgs", schema);
export default BookOrgs;
