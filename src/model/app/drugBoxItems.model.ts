import { Schema, model } from 'mongoose';


const schema = new Schema({
  name: { type: String, required: true }  
});

const DrugBoxItems = model('drug_box_items', schema);
export default DrugBoxItems