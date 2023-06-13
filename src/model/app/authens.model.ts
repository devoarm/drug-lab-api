import { Schema, model } from "mongoose";

const schema = new Schema({
  pid: {
    type: "String",
  },
  titleName: {
    type: "String",
  },
  fname: {
    type: "String",
  },
  lname: {
    type: "String",
  },
  nation: {
    type: "String",
  },
  birthDate: {
    type: "String",
  },
  sex: {
    type: "String",
  },
  transDate: {
    type: "Date",
  },
  mainInscl: {
    type: "String",
  },
  subInscl: {
    type: "String",
  },
  age: {
    type: "String",
  },
  checkDate: {
    type: "Date",
  },
  claimTypes: {
    type: ["Mixed"],
  },
  correlationId: {
    type: "String",
  },
  hospMain: {
    hcode: {
      type: "String",
    },
    hname: {
      type: "String",
    },
  },
  startDateTime: {
    type: "Date",
  },
});

const Authens = model("authens", schema);
export default Authens;
