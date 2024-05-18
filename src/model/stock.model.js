import mongoose from "mongoose";
const stockSchema = new mongoose.Schema({
  name: String,
  price: Number,
  oneDay: String,
  oneYr: String,
});

export const Stock = mongoose.model("Stock", stockSchema);
