import { Schema, model } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },  
});

const BookUrgents = model("book_urgents", schema);
export default BookUrgents;
