import { Schema, model } from "mongoose";

const schema = new Schema({
  num_in: {
    type: "Number",
    require: true,
  },
  year_main: {
    type: "Date",
    require: true,
  },
  type: {
    _id: {
      type: "ObjectId",
    },
    name: {
      type: "String",
    },
  },
  send_to_sign: [
    {
      person_id: {
        type: "String",
      },
      person_name: {
        type: "String",
      },
      is_done: {
        type: "Boolean",
        default: false,
      },
    },
  ],
  send_to_read: [
    {
      person_id: {
        type: "String",
      },
      person_name: {
        type: "String",
      },
    },
  ],
  leader: {
    id: {
      type: "String",
      require: true,
    },
    name: {
      type: "String",
      require: true,
    },
  },
  status: {
    type: "String",
    default: "start",
  },
  num_text: {
    type: "String",
    require: true,
  },
  urgent: {
    _id: {
      type: "String",
    },
    name: {
      type: "String",
    },
  },
  date_time_rec: {
    type: "Date",
  },
  title: {
    type: "String",
    require: true,
  },
  detail: {
    type: "String",
  },
  form_org: {
    _id: {
      type: "String",
    },
    name: {
      type: "String",
    },
  },
  file: {
    name: {
      type: "String",
    },
    type: {
      type: "String",
    },
    size: {
      type: "Number",
    },
  },
  to_org: {
    _id: {
      type: "String",
    },
    name: {
      type: "String",
    },
  },
  createAt: {
    type: "Date",
  },
  updateAt: {
    type: "Date",
  },
});

const BookIns = model("book_ins", schema);
export default BookIns;
