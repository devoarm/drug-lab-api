import { Schema, model } from "mongoose";

const schema = new Schema({  
  drug_name: {
    type: "String",
  },
  drug_unit: {
    _id: {
      type: "ObjectId",
    },
    text: {
      type: "String",
    },
  },
  display_result_text: {
    type: "String",
  },
  drug_description: {
    type: "String",
  },
  formulas: {
    type: ["String"],
  },
});

const drugCalmedVeinFormulas = model("drug_calmed_vein_formulas", schema);
export default drugCalmedVeinFormulas;
