import mongoose from "mongoose";
const portfolioSchema = new mongoose.Schema({
    value: {
        type:Number,
        required:true
    },
    stock:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stock",
    }
  });
  
export const Portfolio = mongoose.model('Portfolio', portfolioSchema);