import { Schema, model } from "mongoose";

const schema = new Schema({
  name: {
    type: "String",
  },
  book_num: {
    type: "String",
  },
  department_sub: [
    {
      _id: { type: "ObjectId" },
      hr_department_sub_name: {
        type: "String",
      },
      isActive: {
        type: "String",
      },
      book_num: {
        type: "String",
      },
      book_hr_id: {
        type: "String",
      },
      leader_hr_id: {
        type: "String",
      },
      phone_in: {
        type: "String",
      },
      line_token_set: {
        type: "String",
      },
    },
  ],

  isActive: {
    type: "String",
  },
  leader_hr_id: {
    type: "String",
  },
  phone_id: {
    type: "String",
  },
  line_token: {
    type: "String",
  },
  hr_depart_id: {
    type: "String",
  },
  createAt: {
    type: "Date",
  },
  updateAt: {
    type: "Date",
  },
});

const Departments = model("departments", schema);
export default Departments;
