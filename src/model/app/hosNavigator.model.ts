import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    text: {
      type: "String",
      require: true,
    },
    id: {
      type: "Number",
      require: true,
    },
    parent: {
      type: "Number",
      require: true,
    },
    markers: {
      left: {
        type: "Number",
        require: true,
      },
      top: {
        type: "Number",
        require: true,
      },
    },
    img: {
      type: "String",
    },
    droppable: { type: "Boolean" },
    emphasis: { type: "Number", default: 2 },
  },
  {
    timestamps: true,
  }
);

const HosNavigatorModel = model("hos_navigators", schema);
export default HosNavigatorModel;
