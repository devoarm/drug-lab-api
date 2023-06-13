import { Schema, model } from "mongoose";

const schema = new Schema({
  year: { type: Number, required: true },
  active: { type: Boolean, default: true },
});

const BookYear = model("book_years", schema);
export default BookYear;
