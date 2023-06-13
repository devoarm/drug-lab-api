import { Schema, model } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },  
});

const BookTypes = model("book_types", schema);
export default BookTypes;
